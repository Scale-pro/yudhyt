// Gera as imagens responsivas (AVIF + WebP) e a og.jpg em public/img a partir das
// fotos em assets/photos. Foto ausente => arte provisória com a identidade da marca.
// Rode `npm run images` sempre que adicionar ou trocar uma foto.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'assets', 'photos');
const outDir = path.join(root, 'public', 'img');

const jobs = [
  { name: 'dra-yudyd-hero', widths: [480, 640, 768], ratio: 4 / 5, position: 'top', theme: 'dark', icon: 'stethoscope' },
  { name: 'dra-yudyd-sobre', widths: [480, 640, 768], ratio: 4 / 5, position: 'top', theme: 'light', icon: 'health_and_safety' },
  { name: 'caso-1', widths: [400, 720], ratio: 1, position: 'centre', theme: 'light', icon: 'scale' },
  { name: 'caso-2', widths: [400, 720], ratio: 1, position: 'centre', theme: 'light', icon: 'bolt' },
  { name: 'caso-3', widths: [400, 720], ratio: 1, position: 'centre', theme: 'light', icon: 'verified-fill' },
];

const sprite = fs.readFileSync(path.join(root, 'src', 'icons.svg'), 'utf8');
const iconMarkup = (id) => sprite.match(new RegExp(`<symbol id="i-${id}"[^>]*>(.*?)</symbol>`))[1];

const findSource = (name) => {
  const file = fs.existsSync(srcDir) && fs.readdirSync(srcDir).find((f) => path.parse(f).name === name && /\.(jpe?g|png|webp|avif)$/i.test(f));
  return file ? path.join(srcDir, file) : null;
};

// Arte provisória em SVG: gradiente da marca, anéis dourados e ícone central
const placeholder = ({ ratio, theme, icon }) => {
  const w = 800;
  const h = Math.round(w / ratio);
  const cx = w / 2;
  const cy = h * (ratio < 1 ? 0.42 : 0.5);
  const bg = theme === 'dark' ? ['#0f2942', '#001428'] : ['#fbf7ee', '#eadbb8'];
  const ring = theme === 'dark' ? 0.45 : 0.6;
  const size = w * 0.22;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dfbe82"/><stop offset=".5" stop-color="#c5a059"/><stop offset="1" stop-color="#a67c2e"/></linearGradient>
    <radialGradient id="glow" cx="${cx / w}" cy="${cy / h}" r=".55"><stop offset="0" stop-color="#c5a059" stop-opacity=".28"/><stop offset="1" stop-color="#c5a059" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <circle cx="${cx}" cy="${cy}" r="${w * 0.24}" fill="none" stroke="url(#gold)" stroke-opacity="${ring}" stroke-width="3"/>
  <circle cx="${cx}" cy="${cy}" r="${w * 0.33}" fill="none" stroke="url(#gold)" stroke-opacity="${ring * 0.5}" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="${w * 0.43}" fill="none" stroke="url(#gold)" stroke-opacity="${ring * 0.25}" stroke-width="2"/>
  <g fill="url(#gold)" transform="translate(${cx - size / 2} ${cy + size / 2}) scale(${size / 960})">${iconMarkup(icon)}</g>
</svg>`);
};

fs.mkdirSync(outDir, { recursive: true });

for (const job of jobs) {
  const { name, widths, ratio, position } = job;
  const photo = findSource(name) ?? (name === 'dra-yudyd-sobre' ? findSource('dra-yudyd-hero') : null);
  const input = photo ?? (await sharp(placeholder(job)).png().toBuffer());
  for (const width of widths) {
    const height = Math.round(width / ratio);
    const base = sharp(input).rotate().resize(width, height, { fit: 'cover', position });
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(path.join(outDir, `${name}-${width}.avif`));
    await base.clone().webp({ quality: 74, effort: 6 }).toFile(path.join(outDir, `${name}-${width}.webp`));
  }
  console.log(`${photo ? '✓ foto' : '○ arte provisória'} ${name}`);
}

// Imagem de compartilhamento (Open Graph) 1200x630
const heroPhoto = findSource('dra-yudyd-hero');
const ogSide = await sharp(heroPhoto ?? (await sharp(placeholder(jobs[0])).png().toBuffer()))
  .rotate()
  .resize(504, 630, { fit: 'cover', position: 'top' })
  .toBuffer();
const ogText = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="696" height="630">
  <style>.t{font-family:'Plus Jakarta Sans','Liberation Sans',Arial,sans-serif}</style>
  <text x="64" y="150" class="t" fill="#DFBE82" font-size="22" font-weight="700" letter-spacing="3">CRM-SP 235037 • SAÚDE METABÓLICA</text>
  <text x="64" y="240" class="t" fill="#ffffff" font-size="56" font-weight="700">Dra. Yudyd Martinez</text>
  <text x="64" y="320" class="t" fill="#cbdbf5" font-size="30">Emagrecimento clínico e</text>
  <text x="64" y="362" class="t" fill="#cbdbf5" font-size="30">saúde metabólica</text>
  <text x="64" y="470" class="t" fill="#DFBE82" font-size="24" font-weight="600">Online para todo o Brasil</text>
  <text x="64" y="506" class="t" fill="#DFBE82" font-size="24" font-weight="600">Presencial em Mogi Guaçu e Mogi Mirim</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#001428' } })
  .composite([
    { input: ogText, left: 0, top: 0 },
    { input: ogSide, left: 696, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(outDir, 'og.jpg'));
console.log('✓ og.jpg');
