# Laura LP — Export Elementor (14 JSONs por secao)

Landing page "Checklist Diario para Criancas Autistas" (Catarina Azevedo) exportada em 14 arquivos JSON, um por secao, prontos para importar no Elementor como **Templates de Secao**.


## Import recomendado (consolidado)

**Use `laura-lp-full.json`** — JSON unico com as 14 secoes como containers Elementor separados. Importe este arquivo no Elementor e a pagina inteira vem montada de uma vez.

Os arquivos 01-14 individuais ficam como backup caso queira importar uma secao por vez.

## Estrategia tecnica

Cada JSON contem:
- 1 container Elementor (`elType: "container"`, full width)
- 1 widget HTML com o markup original da secao + CSS completo da LP injetado via `<style>` inline
- Fontes Google importadas no proprio widget (nao depende de config do tema)
- Timer JS embutido nos JSONs 01 (NAV) e 10 (OFERTA)

Vantagem: visual 100% identico ao preview. Funciona em qualquer tema WP, sem depender de classes globais.

## Ordem de import

Importar na ordem numerica para manter a hierarquia da pagina:

1. `01-nav.json` — Barra de urgencia + timer MM:SS (sticky no topo)
2. `02-hero.json` — Headline principal, badges, CTA e social proof
3. `03-dor.json` — Secao "Custo invisivel" com orbita animada
4. `04-mecanismo.json` — Evidencias cientificas (60% / 1 de 28 / 0,5-1%)
5. `05-produto.json` — Apresentacao do produto + 4 pilares
6. `06-conteudo-zigzag.json` — 4 secoes do checklist em layout zigzag
7. `07-qualificacao.json` — "Faz sentido" vs "Nao faz sentido"
8. `08-cenas.json` — 8 cenas do cotidiano
9. `09-autora.json` — Sobre Catarina Azevedo
10. `10-oferta.json` — Stack de valor + preco + timer DD:HH:MM:SS
11. `11-garantia.json` — Selo de 15 dias
12. `12-faq.json` — 12 perguntas frequentes
13. `13-cta-final.json` — CTA de fechamento
14. `14-footer.json` — Disclaimers + links legais

## Como importar cada secao

No WordPress:
1. Ir em **Templates > Templates Salvos > Adicionar Novo**
2. Clicar no icone de pasta (Importar Template)
3. Selecionar o arquivo JSON
4. Salvar
5. Na pagina destino, arrastar o template na posicao correta

Alternativa mais rapida (recomendada):
1. Criar uma pagina nova como **draft**
2. Editar com Elementor
3. Na area de trabalho, clicar no icone de pasta (Add Template > My Templates)
4. Importar os 14 JSONs em sequencia
5. Cada um aparece como template de secao arrastavel

## Google Fonts necessarias

As fontes ja estao importadas via `@import` em cada JSON (nao precisa configurar no tema). Se preferir carregar no cabecalho global, adicione em **Elementor > Custom Code > header**:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Familias usadas:
- **Space Grotesk** — headings (H1/H2/H3)
- **Inter** — body text e UI
- **Fraunces** — acentos serifados
- **JetBrains Mono** — numeros e timers

## Imagens para upload

Os JSONs apontam para URLs absolutas do GitHub Pages (`contatoeltonmiranda-code.github.io/laura-checklist-autistas-preview/assets/images/`). Se preferir servir pelo proprio WordPress, faca upload dos arquivos abaixo na Media Library e depois substitua as URLs nos widgets HTML:

- `backgroundfundo.png` — Mockup do ebook (usado no HERO e na OFERTA)
- `ebook-mockup.png` — Mockup central da cena orbital (secao DOR)
- `hero-family.png` — Mae e filha (secao MECANISMO)
- `product-child.png` — Crianca usando o checklist (secao PRODUTO)
- `cover-dia.png` — Cover "Checklist diario" (ZIGZAG 1)
- `cover-manha.png` — Cover "Rotina da manha" (ZIGZAG 2)
- `cover-transicoes.png` — Cover "Transicoes" (ZIGZAG 3)
- `cover-noite.png` — Cover "Rotina noite" (ZIGZAG 4)
- `scenes-bg.png` — Background textual da secao 8 CENAS (opcional)

Avatares do hero (`randomuser.me/api/portraits/women/...`) vem de CDN externa — nao precisa upload.

## Timer dinamico

Os JSONs `01-nav.json` e `10-oferta.json` ja incluem o script completo do timer (`assets/script.js` embutido como `<script>` dentro do widget HTML). Nao precisa colar em Header/Footer Scripts.

O timer usa `localStorage.laura_timer_end` sincronizado entre NAV (MM:SS, conta regressiva de 10 min) e OFERTA (DD:HH:MM:SS, mesma chave, renderizacao diferente).

**Nota importante:** o script tambem injeta as funcoes `reveal on scroll`, `smooth scroll`, `sticky CTA mobile` e textos dinamicos de data ("Oferta valida nos dias X, Y e Z"). Se importar **apenas algumas secoes** (nao todas), certifique-se de importar ao menos o `01-nav.json` — ele carrega o JS global da LP.

## Checklist pos-import

- [ ] Pagina criada como **draft** (nao publicar sem aprovacao do Elton)
- [ ] 14 secoes importadas na ordem correta
- [ ] Imagens carregando (verificar console do browser)
- [ ] Timer MM:SS na NAV e DD:HH:MM:SS na OFERTA funcionando
- [ ] CTAs com pulse animation ativa
- [ ] Reveal on scroll animando ao rolar
- [ ] Sticky CTA mobile aparecendo apos 500px de scroll
- [ ] Responsividade OK em mobile (< 768px)
- [ ] Links ancora (#oferta, #checkout) navegando suavemente
- [ ] FAQ abrindo/fechando (elemento `<details>` nativo)

## Paleta (Cosmic Calm Premium)

- `#0A0E27` bg-primary
- `#131842` bg-secondary
- `#60A5FA` cyan-glow
- `#6366F1` indigo
- `#8B5CF6` violet
- `#F59E0B` gold
- `#EC4899` warm-pink

## Avisos

- Cada JSON tem ~75 KB por causa do CSS completo duplicado. E proposital (fidelidade visual > tamanho).
- Se importar TODAS as secoes, o CSS vai aparecer 14x na pagina. Browser ignora duplicatas, nao afeta renderizacao — mas se quiser otimizar, copie o conteudo da tag `<style>` de qualquer JSON para **Elementor > Custom Code > header** e remova as tags `<style>` de todos os widgets HTML depois do import.
- Widgets HTML no Elementor nao suportam edicao visual do conteudo — para alterar texto depois, edite o HTML do widget ou substitua o template de secao.
