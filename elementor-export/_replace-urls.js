const fs = require('fs');
const path = require('path');

const OLD_BASE = 'https://contatoeltonmiranda-code.github.io/laura-checklist-autistas-preview/assets/images/';
const NEW_BASE = 'https://expertlyadvice.com/wp-content/uploads/2026/04/';

const folders = [
  'C:/Users/elton/temp/laura-lp-preview/elementor-export',
  'C:/Users/elton/OneDrive/Documentos/Documentos VS CODE/2. wp-elementor/clientes/Cliente 13 - Laura Petim/elementor-export'
];

let grandTotal = 0;
folders.forEach(dir => {
  console.log('\n=== ' + dir + ' ===');
  fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.startsWith('_')).forEach(f => {
    const p = path.join(dir, f);
    const before = fs.readFileSync(p, 'utf8');
    const count = (before.match(new RegExp(OLD_BASE.replace(/[.*+?^${}()|[\]\]/g, '\$&'), 'g')) || []).length;
    const after = before.split(OLD_BASE).join(NEW_BASE);
    if (before !== after) {
      try {
        JSON.parse(after);
      } catch (e) {
        console.error(f + ': INVALID JSON after replace - ' + e.message);
        return;
      }
      fs.writeFileSync(p, after);
      console.log(f + ': ' + count + ' replacements');
      grandTotal += count;
    } else {
      console.log(f + ': no change');
    }
  });
});
console.log('\nGRAND TOTAL: ' + grandTotal + ' replacements');
