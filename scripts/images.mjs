// Gera as imagens responsivas (AVIF + WebP) em public/img a partir das fotos
// originais em assets/photos. Rode `npm run images` sempre que trocar uma foto.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'assets', 'photos');
const outDir = path.join(root, 'public', 'img');

const jobs = [
  { name: 'dra-yudyd-hero', widths: [480, 640, 768], ratio: 4 / 5, position: 'top' },
  { name: 'dra-yudyd-sobre', widths: [480, 640, 768], ratio: 4 / 5, position: 'top' },
  { name: 'caso-1', widths: [400, 720], ratio: 1, position: 'centre' },
  { name: 'caso-2', widths: [400, 720], ratio: 1, position: 'centre' },
  { name: 'caso-3', widths: [400, 720], ratio: 1, position: 'centre' },
];

const findSource = (name) => {
  const file = fs.readdirSync(srcDir).find((f) => path.parse(f).name === name);
  if (!file) throw new Error(`Foto não encontrada: assets/photos/${name}.(jpg|png|webp|avif)`);
  return path.join(srcDir, file);
};

fs.mkdirSync(outDir, { recursive: true });

for (const { name, widths, ratio, position } of jobs) {
  const input = findSource(name);
  for (const width of widths) {
    const height = Math.round(width / ratio);
    const base = sharp(input).rotate().resize(width, height, { fit: 'cover', position });
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(path.join(outDir, `${name}-${width}.avif`));
    await base.clone().webp({ quality: 74, effort: 6 }).toFile(path.join(outDir, `${name}-${width}.webp`));
  }
  console.log(`✓ ${name}`);
}

// Imagem de compartilhamento (Open Graph) 1200x630: foto da médica sobre fundo navy
const ogPhoto = await sharp(findSource('dra-yudyd-hero'))
  .rotate()
  .resize(504, 630, { fit: 'cover', position: 'top' })
  .toBuffer();
const ogText = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="696" height="630">
  <style>.t{font-family:'Plus Jakarta Sans',Arial,sans-serif}</style>
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
    { input: ogPhoto, left: 696, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(outDir, 'og.jpg'));
console.log('✓ og.jpg');
