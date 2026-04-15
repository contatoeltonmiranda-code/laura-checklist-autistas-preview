const fs = require('fs');
const path = require('path');

const ORDER = [
  '01-nav.json',
  '02-hero.json',
  '03-dor.json',
  '04-mecanismo.json',
  '05-produto.json',
  '06-conteudo-zigzag.json',
  '07-qualificacao.json',
  '08-cenas.json',
  '09-autora.json',
  '10-oferta.json',
  '11-garantia.json',
  '12-faq.json',
  '13-cta-final.json',
  '14-footer.json'
];

const folders = [
  'C:/Users/elton/temp/laura-lp-preview/elementor-export',
  'C:/Users/elton/OneDrive/Documentos/Documentos VS CODE/2. wp-elementor/clientes/Cliente 13 - Laura Petim/elementor-export'
];

folders.forEach(dir => {
  const containers = ORDER.map(f => {
    const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    return d.content[0];
  });

  const consolidated = {
    version: '0.4',
    title: 'Laura LP - Checklist Criancas Autistas',
    type: 'page',
    content: containers,
    page_settings: []
  };

  const outPath = path.join(dir, 'laura-lp-full.json');
  fs.writeFileSync(outPath, JSON.stringify(consolidated, null, 2));
  JSON.parse(fs.readFileSync(outPath, 'utf8'));
  const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
  console.log(`${dir} => laura-lp-full.json (${kb} KB)`);
});
