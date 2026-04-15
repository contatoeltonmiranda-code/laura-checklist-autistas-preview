const fs = require('fs');
const path = require('path');

const ROOT = 'C:/Users/elton/temp/laura-lp-preview';
const OUT = path.join(ROOT, 'elementor-export');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'assets/styles.css'), 'utf8');
const scriptJs = fs.readFileSync(path.join(ROOT, 'assets/script.js'), 'utf8');

const IMG_BASE = 'https://contatoeltonmiranda-code.github.io/laura-checklist-autistas-preview/assets/images/';

function fixAssetUrls(html) {
  return html
    .replace(/assets\/images\//g, IMG_BASE)
    .replace(/assets\/og\.png/g, 'https://contatoeltonmiranda-code.github.io/laura-checklist-autistas-preview/assets/og.png');
}

let idCounter = 0;
function hex8(seed) {
  idCounter++;
  const s = (seed + idCounter).toString();
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  return ('00000000' + (hash >>> 0).toString(16)).slice(-8);
}

function extractByLines(startLine, endLine) {
  const lines = indexHtml.split('\n');
  return fixAssetUrls(lines.slice(startLine - 1, endLine).join('\n'));
}

const FONT_IMPORTS = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=JetBrains+Mono:wght@400;500&display=swap');`;

function makeSection(title, htmlContent, extraScript) {
  const containerId = hex8(title + '_c');
  const htmlWidgetId = hex8(title + '_h');
  const fullCss = FONT_IMPORTS + '\n' + css;
  const fullHtml = `<style>\n${fullCss}\n</style>\n${htmlContent}${extraScript ? '\n<script>' + extraScript + '</script>' : ''}`;

  return {
    version: '0.4',
    title: title,
    type: 'section',
    content: [
      {
        id: containerId,
        elType: 'container',
        settings: {
          content_width: 'full',
          flex_direction: 'column',
          padding: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true },
          margin: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true }
        },
        elements: [
          {
            id: htmlWidgetId,
            elType: 'widget',
            widgetType: 'html',
            settings: { html: fullHtml },
            elements: []
          }
        ]
      }
    ],
    page_settings: []
  };
}

const TIMER_SCRIPT = scriptJs;

const sections = [
  { file: '01-nav.json',             title: 'Laura LP — 01 NAV',             start: 28,  end: 39,  includeScript: true  },
  { file: '02-hero.json',            title: 'Laura LP — 02 HERO',            start: 43,  end: 87,  includeScript: false },
  { file: '03-dor.json',             title: 'Laura LP — 03 DOR',             start: 89,  end: 153, includeScript: false },
  { file: '04-mecanismo.json',       title: 'Laura LP — 04 MECANISMO',       start: 155, end: 209, includeScript: false },
  { file: '05-produto.json',         title: 'Laura LP — 05 PRODUTO',         start: 212, end: 267, includeScript: false },
  { file: '06-conteudo-zigzag.json', title: 'Laura LP — 06 CONTEUDO ZIGZAG', start: 269, end: 331, includeScript: false },
  { file: '07-qualificacao.json',    title: 'Laura LP — 07 QUALIFICACAO',    start: 334, end: 384, includeScript: false },
  { file: '08-cenas.json',           title: 'Laura LP — 08 CENAS',           start: 386, end: 413, includeScript: false },
  { file: '09-autora.json',          title: 'Laura LP — 09 AUTORA',          start: 415, end: 436, includeScript: false },
  { file: '10-oferta.json',          title: 'Laura LP — 10 OFERTA',          start: 438, end: 520, includeScript: true  },
  { file: '11-garantia.json',        title: 'Laura LP — 11 GARANTIA',        start: 522, end: 554, includeScript: false },
  { file: '12-faq.json',             title: 'Laura LP — 12 FAQ',             start: 556, end: 650, includeScript: false },
  { file: '13-cta-final.json',       title: 'Laura LP — 13 CTA FINAL',       start: 652, end: 674, includeScript: false },
  { file: '14-footer.json',          title: 'Laura LP — 14 FOOTER',          start: 678, end: 700, includeScript: false }
];

const report = [];
sections.forEach(s => {
  const html = extractByLines(s.start, s.end);
  const obj = makeSection(s.title, html, s.includeScript ? TIMER_SCRIPT : '');
  const outPath = path.join(OUT, s.file);
  const str = JSON.stringify(obj, null, 2);
  JSON.parse(str);
  fs.writeFileSync(outPath, str, 'utf8');
  const stats = fs.statSync(outPath);
  report.push({ file: s.file, kb: (stats.size / 1024).toFixed(1) });
  console.log('OK', s.file, (stats.size / 1024).toFixed(1), 'KB');
});

fs.writeFileSync(path.join(OUT, '_report.json'), JSON.stringify(report, null, 2));
console.log('\nTotal arquivos gerados:', report.length);
