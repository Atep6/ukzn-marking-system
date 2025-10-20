param(
    [int]$Port = 3000,
    [string]$Hostname = 'localhost',
    [int]$WaitSeconds = 15
)

# Start the dev server in a new PowerShell process and return its PID
Write-Host "Starting dev server on http://$Host`:$Port..."
 $startInfo = Start-Process -FilePath 'node' -ArgumentList "./scripts/dev-serve.js" -PassThru -WindowStyle Hidden
 $devPid = $startInfo.Id
 Write-Host "Dev server PID: $devPid"

function Wait-ForUrl {
    param(
        [string]$Url,
        [int]$TimeoutSeconds = 15
    )
    $end = (Get-Date).AddSeconds($TimeoutSeconds)
    while((Get-Date) -lt $end) {
        try {
            $r = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 3 -ErrorAction SilentlyContinue
            if ($r -and $r.StatusCode -eq 200) { return $true }
        } catch { }
        Start-Sleep -Seconds 1
    }
    return $false
}

    $url = "http://$Hostname`:$Port/login"
    Write-Host "Waiting up to $WaitSeconds seconds for $url to become available..."
    if (-not (Wait-ForUrl -Url $url -TimeoutSeconds $WaitSeconds)) {
        Write-Host "ERROR: $url did not respond within $WaitSeconds seconds. Stopping dev server (PID $devPid) and exiting with code 2." -ForegroundColor Red
        Stop-Process -Id $devPid -ErrorAction SilentlyContinue
        exit 2
    }

Write-Host "URL is available. Running Playwright tests via cmd to avoid PowerShell npx policy issues..."

$reportDir = Join-Path -Path (Get-Location) -ChildPath 'playwright-report'
if (Test-Path $reportDir) { Remove-Item -Recurse -Force $reportDir }

Write-Host "Executing Playwright via cmd to avoid PowerShell npx policy issues..."
 $proc = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c','npx playwright test --project=chromium --reporter=html' -NoNewWindow -Wait -PassThru
 $exitCode = $proc.ExitCode

Write-Host "Playwright exit code: $exitCode"

Write-Host "Stopping dev server (PID $devPid)..."
Stop-Process -Id $devPid -ErrorAction SilentlyContinue

if ($exitCode -ne 0) { exit $exitCode }
exit 0
