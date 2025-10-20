const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const HOST = process.env.HOST || 'localhost';
const PORT = parseInt(process.env.PORT || '3000', 10);
const TRY_URLS = [
  `http://127.0.0.1:${PORT}/login`,
  `http://localhost:${PORT}/login`,
];
const WAIT_SECONDS = parseInt(process.env.WAIT_SECONDS || '30', 10);

const net = require('net');

function tryTcp(host, port, timeoutMs = 1000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let done = false;
    socket.setTimeout(timeoutMs);
    socket.on('connect', () => { done = true; socket.destroy(); resolve(true); });
    socket.on('error', () => { if (!done) { done = true; resolve(false); } });
    socket.on('timeout', () => { if (!done) { done = true; socket.destroy(); resolve(false); } });
    socket.connect(port, host);
  });
}

function waitForAnyUrl(urls, timeoutSeconds) {
  const end = Date.now() + timeoutSeconds * 1000;
  return new Promise((resolve) => {
    (function check() {
      const now = Date.now();
      if (now >= end) return resolve(false);
      let pending = urls.length;
      let found = false;
      urls.forEach((url) => {
        const req = http.get(url, (res) => {
          res.resume();
          if (!found && res.statusCode === 200) { found = true; return resolve({ ok: true, url }); }
          if (--pending === 0 && !found) {
            // HTTP didn't return 200 from any; try TCP fallback
            (async () => {
              const tcpOk = await tryTcp('127.0.0.1', PORT, 1000) || await tryTcp('::1', PORT, 1000);
              if (tcpOk) return resolve({ ok: true, url: null, tcp: true });
              if (Date.now() < end) return setTimeout(check, 1000);
              return resolve({ ok: false });
            })();
          }
        });
        req.on('error', () => {
          if (--pending === 0 && !found) {
            (async () => {
              const tcpOk = await tryTcp('127.0.0.1', PORT, 1000) || await tryTcp('::1', PORT, 1000);
              if (tcpOk) return resolve({ ok: true, url: null, tcp: true });
              if (Date.now() < end) return setTimeout(check, 1000);
              return resolve({ ok: false });
            })();
          }
        });
        req.setTimeout(1500, () => req.abort());
      });
    })();
  });
}

function startDevServer() {
  const fs = require('fs');
  const outLog = path.join(__dirname, '..', 'dev-server.stdout.log');
  const errLog = path.join(__dirname, '..', 'dev-server.stderr.log');
  const outStream = fs.createWriteStream(outLog, { flags: 'a' });
  const errStream = fs.createWriteStream(errLog, { flags: 'a' });
  const server = spawn(process.execPath, [path.join(__dirname, 'dev-serve.js')], {
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });
  server.stdout.on('data', (d) => { process.stdout.write(`[dev] ${d}`); outStream.write(d); });
  server.stderr.on('data', (d) => { process.stderr.write(`[dev.err] ${d}`); errStream.write(d); });
  server.on('exit', (code, sig) => { console.log(`[dev] exited ${code} ${sig || ''}`); });
  return server;
}

function runPlaywright() {
  // On Windows invoke playwright via cmd /c npx to avoid spawn EINVAL and ps1 policy errors.
  if (process.platform === 'win32') {
    return spawn('cmd.exe', ['/c', 'npx', 'playwright', 'test', '--project=chromium', '--reporter=html'], { stdio: 'inherit' });
  }

  // On POSIX try the local playwright binary from node_modules/.bin first
  const binPathPosix = path.join(process.cwd(), 'node_modules', '.bin', 'playwright');
  if (require('fs').existsSync(binPathPosix)) {
    return spawn(binPathPosix, ['test', '--project=chromium', '--reporter=html'], { stdio: 'inherit' });
  }

  // Fallback to npx
  return spawn('npx', ['playwright', 'test', '--project=chromium', '--reporter=html'], { stdio: 'inherit' });
}

(async function main() {
  console.log(`Starting dev server (node ./scripts/dev-serve.js) and waiting up to ${WAIT_SECONDS}s for one of: ${TRY_URLS.join(', ')}`);
  const dev = startDevServer();

  const result = await waitForAnyUrl(TRY_URLS, WAIT_SECONDS);
  if (!result || !result.ok) {
    console.error(`ERROR: none of ${TRY_URLS.join(', ')} responded within ${WAIT_SECONDS}s. Dumping netstat and killing dev server.`);
    try {
      const dump = spawn('cmd.exe', ['/c', 'netstat -ano | findstr :' + PORT], { stdio: ['ignore', 'pipe', 'pipe'] });
      dump.stdout.on('data', (d) => process.stdout.write(d));
      dump.stderr.on('data', (d) => process.stderr.write(d));
    } catch (e) { console.error('Failed to run netstat:', e); }
    try { dev.kill('SIGTERM'); } catch (e) {}
    process.exit(2);
  }

  console.log(`Server is up (${result.url || 'tcp ok'}) — running Playwright tests (Chromium)`);
  const pw = runPlaywright();
  pw.on('exit', (code, sig) => {
    console.log(`Playwright exited with code ${code} ${sig ? `(signal ${sig})` : ''}`);
    try { dev.kill('SIGTERM'); } catch (e) {}
    process.exit(code === null ? 1 : code);
  });
  pw.on('error', (err) => {
    console.error('Failed to start Playwright:', err);
    try { dev.kill('SIGTERM'); } catch (e) {}
    process.exit(3);
  });
})();
