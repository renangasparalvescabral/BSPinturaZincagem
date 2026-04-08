# 🏭 BS Pinturas & Zincagem — Site Institucional

> Site oficial da **BS Pinturas**, empresa especializada em tratamento de superfícies industriais: Jateamento, Pintura Eletrostática, Pintura Líquida Epoxi/PU e Revestimento em Teflon.

---

## 📋 Sobre o Projeto

Este repositório contém o site institucional completo da **BS Pinturas & Zincagem**, desenvolvido em **HTML + CSS + JS puro**, com visual industrial, robusto e sério — alinhado à identidade da empresa e ao seu público-alvo B2B industrial.

### 🏢 Sobre a Empresa

**BS Pinturas & Zincagem** é uma empresa de tratamento de superfícies localizada no Parque Industrial Bandeirantes, em **Santa Bárbara d'Oeste - SP**. Atende indústrias, metalúrgicas, fabricantes de máquinas e equipamentos, oferecendo serviços de alta performance para proteção e acabamento de peças metálicas.

- 📍 Rua Milton Kilner Pio, 530 — Pq. Industrial Bandeirantes, Santa Bárbara d'Oeste - SP — 13457-176
- 📱 WhatsApp: +55 19 21444096
- 📧 adm@bspinturas.com.br
- 📸 Instagram: [@bs.pinturas_br](https://www.instagram.com/bs.pinturas_br)

---

## 🎯 Objetivo do Site

Criar uma presença digital profissional que:

- Apresente os serviços da empresa com credibilidade técnica
- Gere novos leads e solicitações de orçamento
- Transmita confiança ao público industrial B2B
- Seja encontrado por clientes na região de Santa Bárbara d'Oeste e cidades vizinhas

---

## 🔧 Serviços Contemplados no Site

| Serviço | Descrição |
|---|---|
| ⚙️ **Jateamento** | Preparação abrasiva de superfícies metálicas para remoção de oxidação e contaminantes |
| ⚡ **Pintura Eletrostática** | Aplicação de tinta em pó via campo elétrico — acabamento uniforme e durável |
| 🛢️ **Pintura Líquida Epoxi / PU** | Revestimento líquido de alta performance com resinas epóxi e poliuretano |
| 🔬 **Revestimento em Teflon** | Aplicação de PTFE para resistência química, antiaderência e alta durabilidade |

---

## 🗂️ Estrutura do Projeto

```
bs-pinturas/
│
├── index.html               # Página inicial (Home)
├── sobre.html               # Sobre a empresa
├── servicos.html            # Página de serviços
├── galeria.html             # Galeria de trabalhos
├── orcamento.html           # Formulário de orçamento
├── contato.html             # Contato e localização
│
├── assets/
│   ├── css/
│   │   ├── style.css        # Estilos globais + variáveis
│   │   ├── components.css   # Componentes reutilizáveis
│   │   └── responsive.css   # Media queries
│   │
│   ├── js/
│   │   ├── main.js          # Scripts globais
│   │   ├── menu.js          # Menu mobile e navegação
│   │   ├── galeria.js       # Lightbox da galeria
│   │   └── orcamento.js     # Validação e envio do formulário
│   │
│   └── images/
│       ├── logo/            # Logo em variações (PNG, SVG)
│       ├── servicos/        # Fotos por serviço
│       ├── galeria/         # Portfólio de trabalhos
│       └── hero/            # Imagens de destaque
│
└── README.md
```

---

## 📄 Páginas do Site

### 1. `index.html` — Home
- Hero section com slogan e chamada para ação (CTA)
- Cards dos 4 serviços principais
- Números/diferenciais da empresa (anos de mercado, clientes, etc.)
- Prévia da galeria de trabalhos
- Seção de contato rápido / WhatsApp

### 2. `sobre.html` — Sobre
- História da empresa
- Missão, Visão e Valores
- Equipe / estrutura
- Certificações e diferenciais

### 3. `servicos.html` — Serviços
- Página dedicada a cada serviço com descrição técnica
- Para que serve, como é feito, em quais peças se aplica
- CTA para orçamento em cada serviço

### 4. `galeria.html` — Galeria
- Portfólio de trabalhos realizados
- Filtro por tipo de serviço
- Lightbox para visualização ampliada das fotos

### 5. `orcamento.html` — Orçamento
- Formulário de solicitação de orçamento
- Campos: Nome, Empresa, Telefone, Email, Tipo de Serviço, Descrição das Peças, Quantidade
- Integração com WhatsApp e/ou envio por e-mail

### 6. `contato.html` — Contato
- Endereço completo com Google Maps embutido
- Telefone / WhatsApp / E-mail
- Horário de funcionamento
- Formulário de mensagem rápida

---

## 🎨 Identidade Visual

### Paleta de Cores

```css
:root {
  --color-primary:     #1A1A1A;  /* Preto industrial — fundo principal */
  --color-secondary:   #B22222;  /* Vermelho óxido — cor da marca */
  --color-accent:      #D4860A;  /* Laranja aço — destaque e CTAs */
  --color-steel:       #4A5568;  /* Cinza aço — elementos neutros */
  --color-light:       #F5F5F0;  /* Off-white — textos e fundos claros */
  --color-white:       #FFFFFF;
}
```

### Tipografia

- **Títulos:** `Barlow Condensed` (Bold/ExtraBold) — remetendo à sinalização industrial
- **Corpo:** `IBM Plex Sans` — técnico, legível, sério
- **Destaques/Labels:** `Roboto Mono` — precisão técnica

### Estilo Visual

- Visual **industrial e robusto** — texturas de metal, grades, painéis
- Layout sólido com bastante contraste
- Uso de ângulos e diagonais nas seções
- Ícones técnicos / industriais
- Fotos reais dos trabalhos da empresa em destaque

---

## ⚙️ Funcionalidades Técnicas

- [ ] Menu responsivo (hamburger no mobile)
- [ ] Animações de entrada com `Intersection Observer`
- [ ] Galeria com filtro por serviço e lightbox
- [ ] Formulário de orçamento com validação em JS
- [ ] Botão flutuante do WhatsApp
- [ ] Google Maps embutido na página de contato
- [ ] SEO básico: meta tags, Open Graph, favicon
- [ ] Performance: imagens otimizadas, CSS/JS minificados
- [ ] Acessibilidade: contraste WCAG AA, navegação por teclado

---

## 🚀 Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/bs-pinturas.git

# Entre na pasta
cd bs-pinturas

# Abra no navegador (ou use Live Server no VS Code)
open index.html
```

> Não requer build, servidor Node ou dependências — HTML puro roda diretamente no navegador.

---

## 📱 Responsividade

O site será adaptado para:

| Breakpoint | Dispositivo |
|---|---|
| `< 480px` | Smartphones pequenos |
| `480px – 768px` | Smartphones grandes |
| `768px – 1024px` | Tablets |
| `> 1024px` | Desktops e notebooks |

---

## 🔍 SEO — Palavras-chave Alvo

- pintura industrial Santa Bárbara d'Oeste
- jateamento de peças SP
- pintura eletrostática interior SP
- revestimento teflon industrial
- pintura epóxi industrial
- tratamento de superfície metálica

---

## 📦 Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica das páginas |
| CSS3 | Estilização, animações, responsividade |
| JavaScript (ES6+) | Interatividade, validações, galeria |
| Google Fonts | Tipografia |
| Google Maps Embed | Mapa na página de contato |

---

## 👥 Equipe do Projeto

| Papel | Responsável |
|---|---|
| Cliente / Empresa | BS Pinturas |
| Desenvolvimento | A definir |
| Assistência IA | Claude (Anthropic) + Claude Code |

---

## 📅 Roadmap

- [ ] **Fase 1** — Estrutura HTML de todas as páginas
- [ ] **Fase 2** — Estilização CSS (global + componentes + responsivo)
- [ ] **Fase 3** — JavaScript (menu, galeria, formulário, animações)
- [ ] **Fase 4** — Conteúdo real (textos, fotos, informações da empresa)
- [ ] **Fase 5** — SEO, performance e testes cross-browser
- [ ] **Fase 6** — Deploy e publicação

---

## 📄 Licença

Projeto desenvolvido exclusivamente para **BS Pinturas**. Todos os direitos reservados.

---

*Desenvolvido com assistência de [Claude](https://claude.ai) — Anthropic* 🤖
