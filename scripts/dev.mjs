// Servidor de desenvolvimento: roda o build, observa src/ e public/ e
// re-gera dist/ a cada mudança, servindo os arquivos sem dependências extras.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');

// Aceita --port 1234, --port=1234, variável PORT ou 4173 como padrão
const args = process.argv.slice(2);
const eqForm = args.find((a) => a.startsWith('--port='))?.slice('--port='.length);
const spForm = args.includes('--port') ? args[args.indexOf('--port') + 1] : undefined;
const port = Number(eqForm ?? spForm ?? process.env.PORT) || 4173;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const runBuild = () =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(root, 'scripts', 'build.mjs')], { stdio: 'inherit' });
    child.on('exit', (code) => resolve(code === 0));
  });

// Evita builds sobrepostos quando vários eventos de watcher chegam juntos
let running = false;
let queued = false;
const rebuild = async () => {
  if (running) {
    queued = true;
    return;
  }
  running = true;
  do {
    queued = false;
    console.log('↻ rebuild...');
    await runBuild();
  } while (queued);
  running = false;
};

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
    let file = path.normalize(path.join(dist, urlPath === '/' ? 'index.html' : urlPath));
    if (!file.startsWith(dist + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(dist, 'index.html'); // site de página única
    }
    const body = fs.readFileSync(file);
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Rebuilding…');
  }
});

server.on('error', (err) => {
  console.error(`✗ Porta ${port} indisponível: ${err.message}`);
  process.exit(1);
});

await rebuild();
server.listen(port, () => {
  console.log(`✓ Dev server: http://localhost:${port}/ — rebuild automático ao editar src/`);
});

let timer;
const onChange = () => {
  clearTimeout(timer);
  timer = setTimeout(rebuild, 100);
};
fs.watch(path.join(root, 'src'), { recursive: true }, onChange);
fs.watch(path.join(root, 'public'), { recursive: true }, onChange);
for (const f of ['tailwind.config.js', 'site.config.json']) {
  fs.watch(path.join(root, f), onChange);
}
