# Design System PRO — LP Laura (Checklist Diário para Crianças Autistas)

**Briefing do Elton:** mesclar o melhor das 4 referências + cor da paleta do ebook, criar um design system premium estilo PRO focado em LPs de alto padrão que vendem 24h.

**Data:** 2026-04-09

---

## 1. Conceito-mãe

**"Cosmic Calm Premium"** — dark mode profundo com glow cósmico azul (como o próprio ebook da capa), tipografia brutalmente hierárquica, gradients vivos, mockups 3D múltiplos, countdown protagonista, zero visual mole. O oposto do paper/ink que não funcionou.

**Posicionamento visual:** vende como "curso premium 2026", não como "ebook simples".

**Fit com o nicho:** o ebook em si já é dark blue cósmico → a LP é a extensão visual natural do produto. A mãe vê a LP e já reconhece o produto antes de scrollar.

---

## 2. Paleta de cores (validada pelo ebook)

### Base dark cósmica
```css
--bg-primary:     #0A0E27  /* dark blue-black — fundo principal */
--bg-secondary:   #131842  /* azul royal profundo — seções alternadas */
--bg-card:        #1A2050  /* card dark com hint azul */
--bg-elevated:    #252C6B  /* card elevado / hover */
--bg-overlay:     rgba(10, 14, 39, 0.85)  /* overlays com blur */
```

### Brand (direto da capa do ebook)
```css
--royal-blue:     #1E40AF  /* azul royal profundo — cor âncora */
--electric-blue:  #3B82F6  /* azul elétrico — highlights, links */
--cyan-glow:      #60A5FA  /* cyan do halo — borders, glows */
--indigo-glow:    #6366F1  /* indigo — gradients */
--violet-deep:    #8B5CF6  /* violeta — fim de gradient CTA */
```

### Accent warm (do subtítulo "10 Hábitos" + halo magenta)
```css
--gold:           #F59E0B  /* dourado — garantia, selos, urgência */
--gold-bright:    #FBBF24  /* dourado claro — hover, highlights */
--warm-pink:      #EC4899  /* rosa do halo — accent único em garantia */
```

### Text
```css
--text-primary:   #FFFFFF  /* branco puro — headlines */
--text-body:      #E2E8F0  /* slate-200 — body principal */
--text-muted:     #94A3B8  /* slate-400 — labels, metadata */
--text-faint:     #64748B  /* slate-500 — footer, disclaimers */
```

### Borders
```css
--border-subtle:  rgba(96, 165, 250, 0.12)  /* cyan 12% — borders padrão */
--border-normal:  rgba(96, 165, 250, 0.25)
--border-strong:  rgba(96, 165, 250, 0.45)  /* borders hover, cards em destaque */
--border-gold:    rgba(245, 158, 11, 0.4)   /* borders de oferta/garantia */
```

### Gradients
```css
--gradient-cta:
  linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%);
  /* azul → indigo → violeta, da ref 3 (Behance) */

--gradient-hero-bg:
  radial-gradient(ellipse at 50% 0%, #1E40AF 0%, #131842 25%, #0A0E27 60%);
  /* halo cósmico descendente do topo, como o próprio ebook */

--gradient-card:
  linear-gradient(135deg, rgba(30, 64, 175, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%);

--gradient-badge-gold:
  linear-gradient(135deg, #F59E0B 0%, #EC4899 100%);
  /* gold → magenta, para selo de garantia */

--gradient-number-outline:
  linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%);
  /* para números gigantes em outline (ref 2) */

--gradient-border-glow:
  linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899);
  /* para card borders com efeito neon */
```

### Shadows (glow-forward, não flat)
```css
--shadow-glow-blue:  0 0 48px -8px rgba(59, 130, 246, 0.45);
--shadow-glow-indigo: 0 0 64px -12px rgba(99, 102, 241, 0.55);
--shadow-glow-gold:  0 0 40px -8px rgba(245, 158, 11, 0.5);
--shadow-card:       0 12px 48px -12px rgba(0, 0, 0, 0.6),
                     0 0 0 1px rgba(96, 165, 250, 0.12);
--shadow-cta:        0 16px 48px -12px rgba(99, 102, 241, 0.6),
                     0 0 0 1px rgba(139, 92, 246, 0.3);
--shadow-elevated:   0 24px 64px -16px rgba(0, 0, 0, 0.75),
                     0 0 0 1px rgba(96, 165, 250, 0.2);
```

---

## 3. Tipografia

### Fonts (Google Fonts)
```
Space Grotesk — display/headings (grotesque moderna, peso forte)
Inter — body (legibilidade SaaS)
JetBrains Mono — labels/eyebrows (uppercase, tracking wide)
Fraunces — pull quotes/frase-bordão (serif variable para 1 elemento editorial)
```

Import:
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap');
```

### Scale (fluida com clamp)
```css
--text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.813rem)   /* 12-13 */
--text-sm:   clamp(0.813rem, 0.75rem + 0.3vw, 0.875rem)  /* 13-14 */
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem)     /* 16-18 */
--text-lg:   clamp(1.125rem, 1rem + 0.625vw, 1.375rem)   /* 18-22 */
--text-xl:   clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem)   /* 20-26 */
--text-2xl:  clamp(1.5rem, 1.25rem + 1.25vw, 2.125rem)   /* 24-34 */
--text-3xl:  clamp(1.875rem, 1.5rem + 1.875vw, 2.75rem)  /* 30-44 */
--text-4xl:  clamp(2.25rem, 1.75rem + 2.5vw, 3.75rem)    /* 36-60 */
--text-5xl:  clamp(2.75rem, 2rem + 3.75vw, 4.75rem)      /* 44-76 */
--text-6xl:  clamp(3.5rem, 2.5rem + 5vw, 6rem)           /* 56-96 */
--text-hero: clamp(2.75rem, 2rem + 4vw, 5.5rem)          /* 44-88 — H1 hero */
--text-mega: clamp(4rem, 2.5rem + 8vw, 10rem)            /* 64-160 — layered text decoration */
```

### Usage
- **H1 hero:** Space Grotesk 700, `text-hero`, `line-height: 0.95`, `letter-spacing: -0.035em`
- **H2 section:** Space Grotesk 700, `text-4xl`, `line-height: 1.05`, `letter-spacing: -0.025em`
- **H3 subsection:** Space Grotesk 600, `text-2xl`, `line-height: 1.1`
- **Body:** Inter 400, `text-base`, `line-height: 1.65`, cor `--text-body`
- **Body lead:** Inter 500, `text-lg`, `line-height: 1.5`
- **Eyebrow (sobre-headline):** JetBrains Mono 500, `text-xs`, `uppercase`, `letter-spacing: 0.15em`, cor `--cyan-glow`
- **Label/badge:** JetBrains Mono 500, `text-sm`, `uppercase`, `letter-spacing: 0.12em`
- **Pull quote / frase-bordão:** Fraunces 600 italic, `text-3xl`, `line-height: 1.2`, cor `--cyan-glow`
- **Layered text (decoração):** Space Grotesk 700, `text-mega`, `color: transparent`, `-webkit-text-stroke: 1px rgba(96,165,250,0.25)` — usar palavra-âncora atrás de fotos/mockups
- **Números estatísticos gigantes:** Space Grotesk 700, `text-6xl`, background gradient `--gradient-number-outline`, `-webkit-background-clip: text`, `color: transparent`

---

## 4. Spacing, layout, radius

```css
/* Spacing scale (rem) */
--space-1:  0.25rem
--space-2:  0.5rem
--space-3:  0.75rem
--space-4:  1rem
--space-6:  1.5rem
--space-8:  2rem
--space-10: 2.5rem
--space-12: 3rem
--space-16: 4rem
--space-20: 5rem
--space-24: 6rem
--space-32: 8rem    /* padding vertical de seções desktop */
--space-40: 10rem   /* padding vertical do hero desktop */

/* Container */
--container-max: 1200px
--container-px-mobile: 1.25rem
--container-px-desktop: 2rem

/* Radius (não muito grande — premium não é bubbly) */
--radius-sm:  6px    /* badges, labels */
--radius-md:  12px   /* buttons, inputs */
--radius-lg:  20px   /* cards */
--radius-xl:  28px   /* cards premium (oferta) */
--radius-full: 9999px
```

---

## 5. Componentes diferenciadores (o MELHOR de cada referência)

### 5.1. CTA Button Gradient (DA REF 3)
```css
.btn-primary {
  background: var(--gradient-cta);
  color: white;
  font: 600 var(--text-base)/1 'Inter', sans-serif;
  padding: 1.125rem 2.25rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-cta);
  position: relative;
  overflow: hidden;
  transition: transform .3s, box-shadow .3s;
}
.btn-primary::before {
  /* shine sweep on hover */
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: translateX(-100%);
  transition: transform .6s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 24px 64px -12px rgba(99,102,241,0.7); }
.btn-primary:hover::before { transform: translateX(100%); }

/* PULSE opcional — CTAs críticos */
@keyframes pulse-glow {
  0%,100% { box-shadow: 0 16px 48px -12px rgba(99,102,241,0.6); }
  50%     { box-shadow: 0 20px 64px -8px  rgba(139,92,246,0.85); }
}
.btn-primary.is-pulsing { animation: pulse-glow 2.5s ease-in-out infinite; }
```

### 5.2. Glow Border Card (DA REF 2)
```css
.card-glow {
  background: var(--gradient-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 2rem;
  position: relative;
  transition: border-color .3s, transform .3s;
}
.card-glow::before {
  /* animated gradient border on hover */
  content: '';
  position: absolute; inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: var(--gradient-border-glow);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  opacity: 0; transition: opacity .4s;
}
.card-glow:hover { transform: translateY(-4px); border-color: transparent; }
.card-glow:hover::before { opacity: 1; }
```

### 5.3. Outline Number (DA REF 2)
```css
.outline-number {
  font: 700 var(--text-6xl)/1 'Space Grotesk', sans-serif;
  color: transparent;
  -webkit-text-stroke: 2px var(--cyan-glow);
  opacity: 0.9;
  letter-spacing: -0.05em;
}
```
Uso: números gigantes (1, 2, 3) pra marcar etapas/features — só o contorno, vira gráfico puro.

### 5.4. Layered Background Text (DA REF 1)
```css
.layered-word {
  position: absolute;
  font: 900 var(--text-mega)/0.85 'Space Grotesk', sans-serif;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(96,165,250,0.22);
  letter-spacing: -0.06em;
  text-transform: uppercase;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}
```
Uso: palavra-âncora (ex: "CALMA", "ROTINA", "CATARINA") atrás de fotos/mockups — storytelling visual, não decoração vazia.

### 5.5. Countdown Circular (DA REF 1 + REF 2)
```css
.countdown-ring {
  width: 180px; height: 180px;
  border-radius: 50%;
  background: conic-gradient(var(--cyan-glow) 0deg, var(--cyan-glow) 270deg, rgba(96,165,250,0.15) 270deg, rgba(96,165,250,0.15) 360deg);
  display: grid; place-items: center;
  box-shadow: var(--shadow-glow-blue);
  position: relative;
}
.countdown-ring::before {
  content: ''; position: absolute; inset: 6px;
  background: var(--bg-primary);
  border-radius: inherit;
}
.countdown-ring__num {
  position: relative;
  font: 700 clamp(3rem, 6vw, 4.5rem)/1 'Space Grotesk', sans-serif;
  color: white;
}
.countdown-ring__label {
  position: relative;
  font: 500 var(--text-xs)/1 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--cyan-glow);
  margin-top: 0.25rem;
}
```

### 5.6. Guarantee Badge (DA REF 3)
```css
.guarantee-badge {
  width: 220px; height: 220px;
  border-radius: 50%;
  background: var(--gradient-badge-gold);
  display: grid; place-items: center;
  padding: 2rem;
  text-align: center;
  color: white;
  font: 700 var(--text-xl)/1.15 'Space Grotesk', sans-serif;
  box-shadow: var(--shadow-glow-gold);
  position: relative;
}
.guarantee-badge::before {
  /* outer ring decoration */
  content: ''; position: absolute; inset: -8px;
  border-radius: inherit;
  border: 2px dashed rgba(245, 158, 11, 0.4);
  animation: rotate-slow 40s linear infinite;
}
@keyframes rotate-slow { to { transform: rotate(360deg); } }
```

### 5.7. Feature Icon Circle (DA REF 3)
```css
.feature-icon {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--gradient-cta);
  display: grid; place-items: center;
  box-shadow: 0 12px 32px -8px rgba(99,102,241,0.5);
  color: white;
}
```
Ícones line minimalistas dentro de círculos com gradient individual por feature.

### 5.8. Eyebrow / Sobre-headline (DA REF 3)
```css
.eyebrow {
  display: inline-flex; align-items: center; gap: .5rem;
  font: 500 var(--text-xs)/1 'JetBrains Mono', monospace;
  text-transform: uppercase; letter-spacing: 0.15em;
  color: var(--cyan-glow);
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-normal);
  border-radius: var(--radius-full);
  background: rgba(96,165,250,0.06);
}
.eyebrow::before {
  content: '';
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--cyan-glow);
  box-shadow: 0 0 12px var(--cyan-glow);
}
```
Usar em TODAS as seções, consistente. É o padrão que amarra o design.

### 5.9. Velocity Lines Decoration (DA REF 1, adaptado em azul)
```css
.velocity-lines {
  position: absolute; inset: 0;
  background-image: repeating-linear-gradient(
    -35deg,
    transparent 0px, transparent 40px,
    rgba(96,165,250,0.06) 40px, rgba(96,165,250,0.06) 42px
  );
  pointer-events: none;
}
```
Linhas diagonais sutis em ciano pra bordas/seções de urgência. Feel "speed premium".

### 5.10. Ornamental Frame (DA REF 4, adaptado dark)
```css
.ornate-frame {
  position: relative;
  padding: 3rem;
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-lg);
  background: rgba(245,158,11,0.03);
}
.ornate-frame::before,
.ornate-frame::after {
  content: '';
  position: absolute;
  width: 40px; height: 40px;
  border: 2px solid var(--gold);
}
.ornate-frame::before { top: -2px; left: -2px; border-right: 0; border-bottom: 0; }
.ornate-frame::after  { bottom: -2px; right: -2px; border-left: 0; border-top: 0; }
```
Pra destacar mockup do ebook com cantos ornamentais gold — vibe "relíquia premium" sem ser vintage.

### 5.11. Alternating Section Backgrounds (DA REF 4)
```css
.section         { background: var(--bg-primary); }
.section--alt    { background: var(--bg-secondary); }
.section--hero   { background: var(--gradient-hero-bg); position: relative; }
.section--hero::after {
  /* noise grain texture */
  content: ''; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg..."); /* SVG noise */
  opacity: 0.04; pointer-events: none;
}
```
Alternar backgrounds entre seções pra narrativa visual — não deixar a página inteira num único tom.

### 5.12. Highlight Inline (DA REF 2)
```css
.highlight {
  color: var(--cyan-glow);
  font-weight: 600;
  position: relative;
}
.highlight::after {
  content: '';
  position: absolute; left: 0; right: 0; bottom: -2px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--cyan-glow), transparent);
}
```
Pra destacar palavras críticas no meio de parágrafos — sem caixa, só underline gradient.

---

## 6. Motion system

### Princípios
- **Smooth, sem exagero.** Nada de bounce, spring, overshoot.
- **Transições padrão:** 300ms ease-out
- **Respeitar `prefers-reduced-motion`** obrigatório

### Animações-chave
```css
/* Fade + slide up (reveal on scroll) */
@keyframes reveal {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.reveal { animation: reveal 0.8s ease-out forwards; }

/* Glow pulse (CTA primário) */
@keyframes pulse-glow {
  0%,100% { box-shadow: 0 16px 48px -12px rgba(99,102,241,0.6); }
  50%     { box-shadow: 0 20px 64px -8px rgba(139,92,246,0.85); }
}

/* Rotate slow (badges ornamentais) */
@keyframes rotate-slow { to { transform: rotate(360deg); } }

/* Shine sweep (buttons hover) */
@keyframes shine { from { transform: translateX(-100%); } to { transform: translateX(100%); } }

/* Counter para números (JS + IntersectionObserver) */

/* Layered text parallax sutil no hero (scroll) */

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Estrutura da LP (ordem de seções)

Mantém a estrutura da copy v1.3 — apenas a pele muda.

1. **Hero** — fundo radial cósmico + foto mockup ebook + layered text "CALMA" atrás + eyebrow + H1 + sub + CTA gradient + micro-badges
2. **Seção de dor (01 / DOR)** — 3 cards glow com micro-cenas + background alt
3. **Micro-CTA de compromisso** — card destacado com border gold
4. **Educação do mecanismo (02 / MECANISMO)** — drop cap + pull quote em Fraunces italic com frase-bordão
5. **Prova por dados (03 / EVIDÊNCIA)** — 3 cards com números gigantes em outline + fontes
6. **O que é o checklist (04 / PRODUTO)** — ornate frame em volta do mockup + 4 bullets com feature icons
7. **Por dentro do checklist (05 / CONTEÚDO)** — 5 blocks em grid com outline numbers + glow cards
8. **Comparativo (06 / DIFERENCIAÇÃO)** — 2 colunas, "antes/depois" editorial
9. **Para quem é / não é (07 / QUALIFICAÇÃO)** — 2 colunas com ícones verde/vermelho
10. **8 cenas futuras (08 / DESEJO)** — lista editorial com drop cap + frase-bordão 2
11. **Catarina (09 / AUTORIDADE)** — foto com layered word atrás + bio honesta + fecho que redireciona pros dados
12. **Oferta (10 / OFERTA)** — card premium com shadow elevated, stack de valor, preço em Space Grotesk 900, countdown circular, CTA pulsing
13. **Urgência real** — card com velocity lines + data + escassez de bônus
14. **Bónus** — card com gradient border + feature icon
15. **Garantia** — guarantee badge circular gold + card lateral explicando
16. **FAQ** — accordion `<details>` com borders cyan + ícone rotate
17. **CTA final** — bloco full-width com gradient hero + CTA gigante + frase-bordão 3
18. **Rodapé** — minimalista, mono labels, disclaimer

---

## 8. QA / Acessibilidade

- Contraste AAA (7:1+) em texto primário, AA (4.5:1) em body secundário
- Touch targets 44x44px mínimo
- Focus visible rings 3px `--cyan-glow`
- `prefers-reduced-motion` respeitado
- `lang="pt-PT"`
- Alt text em TODAS as imagens (incluindo placeholders)
- FAQ com `<details>` nativo (zero JS necessário)
- Lighthouse target: 90+ perf, 95+ a11y, 95+ seo

---

## 9. Pendências (assets reais)

- Mockup 3D real do ebook (usar a imagem `WhatsApp Image 2026-02-05 at 20.19.05-Photoroom.png` como hero mockup — já existe!)
- Foto real da Catarina (placeholder por enquanto)
- Link Hotmart real (placeholder `#checkout`)
- OG image 1200x630 (placeholder)
- Favicon

---

## 10. Referências mescladas — o que veio de onde

| Componente | Ref origem | Adaptação |
|---|---|---|
| CTA gradient button | Ref 3 (Behance) | Blue→indigo→violet com paleta do ebook |
| Glow border card | Ref 2 (Tech SaaS) | Cyan-glow rgba do halo do ebook |
| Outline numbers | Ref 2 | Ciano do halo do ebook |
| Layered background text | Ref 1 (Cartola) | Palavra-âncora em ciano, não vermelho |
| Countdown ring | Ref 1 + 2 | Azul elétrico em vez de vermelho/verde |
| Guarantee badge circular | Ref 3 | Gradient gold→magenta do ebook |
| Feature icon circles | Ref 3 | Gradient azul→indigo padrão |
| Eyebrow consistente | Ref 3 | JetBrains Mono + cyan-glow |
| Velocity lines | Ref 1 | Ciano rgba sutil em vez de vermelho forte |
| Ornamental frame | Ref 4 (Warm) | Cantos gold em dark mode em vez de brown warm |
| Alternating backgrounds | Ref 4 | Dark→darker→dark em vez de cream→brown |
| Highlight inline gradient | Ref 2 | Cyan-glow |
| Hierarquia tipográfica brutal | Ref 1 | 14px → 160px scale, Space Grotesk |
| Mockup 3D protagonista | Ref 1+2+4 | Usa o próprio PNG do ebook da Laura |
| Mix serif + sans | Ref 4 | Space Grotesk (body sans) + Fraunces (pull quotes serif) |
| Noise grain sutil | Ref 3 | SVG noise 4% opacity no hero |
| Drop caps editoriais | Adaptação própria | Space Grotesk 900 em `::first-letter` |
| Social proof grid denso | Ref 3 | Não aplicável aqui (sem depoimentos) |
