# Dra. Yudyd Martinez — Landing Page

Landing page de **Emagrecimento Clínico & Saúde Metabólica** recriada a partir do layout do Stitch
(`design/code.html`, `design/screen.png`, `design/DESIGN.md`).

Site estático, sem JavaScript no cliente, otimizado para Lighthouse mobile
(meta: Performance ≥ 98, Acessibilidade / Boas Práticas / SEO = 100).

## Estrutura

```
src/index.html        HTML da página (classes Tailwind + placeholders %WA% e %SITE_URL%)
src/styles.css        @font-face, Tailwind e componentes
src/icons.svg         Sprite de ícones Material Symbols (inline no HTML)
public/               Arquivos servidos como estão (fontes, imagens, favicon)
assets/photos/        Fotos originais (fonte para gerar public/img)
scripts/build.mjs     Build: Tailwind purgado + CSS/ícones inline + cache-busting → dist/
scripts/images.mjs    Gera AVIF/WebP responsivos e og.jpg a partir de assets/photos
site.config.json      Número do WhatsApp e URL do site
vercel.json           Build, cache longo para /fonts e /img e headers de segurança
```

## Comandos

```bash
npm install
npm run build     # gera dist/
npm run preview   # serve dist/ em http://localhost:4173
npm run images    # regenera public/img a partir de assets/photos
```

## Personalizar

- **WhatsApp**: troque `whatsapp` em `site.config.json` (formato internacional, só dígitos — ex. `5519987654321`).
  Todos os botões usam esse número.
- **Fotos**: substitua os arquivos em `assets/photos/` mantendo os nomes
  (`dra-yudyd-hero`, `dra-yudyd-sobre`, `caso-1`, `caso-2`, `caso-3`; jpg/png/webp) e rode `npm run images`.
- **Domínio próprio**: ao configurar um domínio na Vercel, defina `siteUrl` em `site.config.json`
  (ex. `https://drayudyd.com.br`) para canonical, Open Graph e sitemap. Sem isso, o build usa o domínio
  de produção da Vercel automaticamente.

## Deploy

O projeto `yudhyt` na Vercel está ligado a este repositório: cada push gera um deploy
(`npm run build` → `dist/`).
