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
assets/photos/        Fotos originais (fonte para gerar public/img) — hoje vazio
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
- **Fotos**: a foto profissional principal fica em `assets/photos/dra-yudyd-hero.jpeg`; o script
  `npm run images` gera versões AVIF/WebP responsivas para o hero, a seção "Sobre" e a imagem Open Graph.
  Se não houver uma foto separada `dra-yudyd-sobre`, a foto principal é reutilizada nessa seção. Para
  adicionar outras fotos, use os nomes abaixo e rode `npm run images`:
  - `dra-yudyd-hero` — foto principal da médica (retrato vertical 4:5, mín. 768×960)
  - `dra-yudyd-sobre` — foto opcional para a seção "Sobre" (retrato vertical 4:5, mín. 768×960)
  - `caso-1`, `caso-2`, `caso-3` — uma foto por caso (quadradas, mín. 720×720). Publique imagens
    identificáveis de pacientes somente com autorização expressa e documentada, respeitando a
    Resolução CFM nº 2.336/2023 e a LGPD; não exponha dados pessoais nos nomes dos arquivos.
- **Domínio próprio**: ao configurar um domínio na Vercel, defina `siteUrl` em `site.config.json`
  (ex. `https://drayudyd.com.br`) para canonical, Open Graph e sitemap. Sem isso, o build usa o domínio
  de produção da Vercel automaticamente.

## Subir para o GitHub

1. Crie um repositório vazio no GitHub (ex. `yudhyt`), **sem** README/license iniciais.
2. Na raiz do projeto:

```bash
git remote add origin https://github.com/SEU_USUARIO/yudhyt.git
git branch -M main
git push -u origin main
```

`node_modules/`, `dist/` e `.cache/` ficam fora do versionamento (`.gitignore`).
`public/img/` **é** versionado de propósito, para o deploy na Vercel não precisar do `sharp`.
`.gitattributes` mantém finais de linha LF em qualquer sistema operacional.

## Deploy na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe o repositório do GitHub.
2. Nenhuma configuração manual: o `vercel.json` já define build `npm run build`, saída em
   `dist/`, `cleanUrls`, headers de segurança e cache imutável (1 ano) para `/fonts` e `/img`.
3. Cada push na `main` gera um deploy de produção; PRs geram preview.

Depois de cada deploy de produção, o workflow **Lighthouse (produção)** mede a página no modo
mobile (3 execuções) e publica as notas no resumo da execução em *Actions*. Sem configuração,
ele usa `https://yudhyt.vercel.app`; ao apontar um domínio próprio, defina a variável
`SITE_URL` no repositório (Settings → Secrets and variables → Actions → Variables).

## Antes de ir ao ar

- Confirme o número real do WhatsApp em `site.config.json` (o atual é um placeholder).
- Com domínio próprio, defina `siteUrl` em `site.config.json` (ou a variável `SITE_URL`
  na Vercel) para canonical, Open Graph e sitemap corretos.
