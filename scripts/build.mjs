// Build estático: compila o Tailwind (com purge), injeta CSS + sprite de
// ícones inline no HTML, minifica o HTML, aplica cache-busting nos assets e
// gera robots/sitemap em dist/.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const cacheDir = path.join(root, '.cache');
const config = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = (
  process.env.SITE_URL ||
  config.siteUrl ||
  (productionHost ? `https://${productionHost}` : 'http://localhost:4173')
).replace(/\/$/, '');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(cacheDir, { recursive: true });
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });

const cssFile = path.join(cacheDir, 'styles.css');
execFileSync(
  path.join(root, 'node_modules', '.bin', 'tailwindcss'),
  ['-i', 'src/styles.css', '-o', cssFile, '--minify'],
  { cwd: root, stdio: 'inherit' },
);

const css = fs.readFileSync(cssFile, 'utf8');
const icons = fs.readFileSync(path.join(root, 'src', 'icons.svg'), 'utf8').trim();

const hashes = new Map();
const assetHash = (urlPath) => {
  if (!hashes.has(urlPath)) {
    const file = path.join(dist, urlPath);
    if (!fs.existsSync(file)) throw new Error(`Asset referenciado não existe: ${urlPath}`);
    hashes.set(urlPath, createHash('sha1').update(fs.readFileSync(file)).digest('hex').slice(0, 10));
  }
  return hashes.get(urlPath);
};

// Minificação conservadora: remove comentários e indentação preservando
// exatamente a semântica de espaços renderizáveis (inline) e o conteúdo
// integral de <script>, <style>, <pre> e <textarea>.
const minifyHtml = (input) => {
  const blocks = [];
  const guarded = input.replace(/<(script|style|pre|textarea)\b[^>]*>[\s\S]*?<\/\1>/gi, (m) => {
    blocks.push(m);
    return `\u0000${blocks.length - 1}\u0000`;
  });
  return guarded
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, '') // comentários HTML
    .replace(/[ \t]+$/gm, '') // espaços à direita das linhas
    .replace(/^[ \t]+/gm, '') // indentação (irrelevante na renderização)
    .replace(/>\s+</g, '> <') // colapsa espaços entre tags mantendo 1 espaço
    .replace(/\n{2,}/g, '\n') // linhas vazias
    .replace(/\u0000(\d+)\u0000/g, (_, i) => blocks[Number(i)]);
};

let html = fs
  .readFileSync(path.join(root, 'src', 'index.html'), 'utf8')
  .replace('<!-- @icons -->', () => icons)
  .replace('/* @css */', () => css)
  .replaceAll('%SITE_URL%', siteUrl)
  .replaceAll('%WA%', config.whatsapp);

html = html.replace(
  /\/(?:fonts|img|js)\/[\w.-]+\.(?:woff2|avif|webp|jpe?g|png|svg|js)|\/favicon\.svg/g,
  (m) => `${m}?v=${assetHash(m)}`,
);

html = minifyHtml(html);

fs.writeFileSync(path.join(dist, 'index.html'), html);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>\n</urlset>\n`,
);

const kb = (n) => `${(n / 1024).toFixed(1)} KiB`;
console.log(
  `✓ dist/index.html ${kb(Buffer.byteLength(html))} (CSS inline ${kb(css.length)}) — siteUrl ${siteUrl}`,
);
