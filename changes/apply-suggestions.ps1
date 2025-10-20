param(
    [switch]$Commit  # pass -Commit to git add & commit after applying
)

$root = Resolve-Path (Join-Path $PSScriptRoot '..') | Select-Object -ExpandProperty Path
$suggestionsPath = Join-Path $root 'suggestions.json'

function Backup-And-Write($targetPath, $content) {
    if (Test-Path $targetPath) {
        $bak = "$targetPath.bak_$(Get-Date -Format 'yyyyMMddHHmmss')"
        Copy-Item -Path $targetPath -Destination $bak -Force
        Write-Host "Backed up existing file to $bak"
    } else {
        $dir = Split-Path $targetPath -Parent
        if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    }
    Set-Content -Path $targetPath -Value $content -Encoding UTF8
    Write-Host "Wrote $targetPath"
}

# Default files to create when suggestions.json is absent
$defaults = @(
    @{
        path = 'jest.config.cjs'
        content = @'
module.exports = {
  rootDir: '.',
  roots: ['<rootDir>/tests/unit'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  testMatch: ['**/tests/unit/**/*.test.ts', '**/tests/unit/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
  transformIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: false
    }
  }
};
'@
    }
    @{
        path = 'tsconfig.json'
        content = @'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": ".",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "types": ["node", "jest"]
  },
  "include": ["src", "tests"]
}
'@
    }
    @{
        path = 'package.json'
        content = @'
{
  "name": "ukzn-marking-system",
  "version": "1.0.0",
  "private": true,
  "engines": { "node": ">=16" },
  "scripts": {
    "test": "jest --config jest.config.cjs --passWithNoTests",
    "test:watch": "jest --config jest.config.cjs --watch"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "ts-jest": "^29.1.0",
    "@types/jest": "^29.5.0",
    "typescript": "^5.3.0",
    "@types/node": "^20.5.0"
  }
}
'@
    }
)

if (-not (Test-Path $suggestionsPath)) {
    Write-Host "suggestions.json not found. Writing default config files..."
    foreach ($entry in $defaults) {
        $target = Join-Path $root $entry.path
        Backup-And-Write -targetPath $target -content $entry.content
    }
} else {
    try {
        $json = Get-Content -Raw -Path $suggestionsPath | ConvertFrom-Json
    } catch {
        Write-Error "Failed to parse suggestions.json: $_"
        exit 1
    }

    foreach ($entry in $json) {
        if (-not $entry.path -or -not $entry.content) {
            Write-Warning "Skipping invalid entry (requires 'path' and 'content')."
            continue
        }

        $target = Join-Path $root $entry.path
        Backup-And-Write -targetPath $target -content $entry.content
    }
}

if ($Commit) {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Warning "git not found in PATH. Skipping commit."
        exit 0
    }
    Push-Location $root
    git add -A
    $msg = "Apply suggestions from apply-suggestions.ps1"
    git commit -m $msg -q 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Changes committed."
    } else {
        Write-Host "No changes to commit or commit failed."
    }
    Pop-Location
}