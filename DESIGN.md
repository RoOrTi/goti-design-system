# GOTI Design System & Project Overview

**Version**: 2.0  
**Last Updated**: 2026-02-15  
**Maintained by**: Rodrigo Ordoñez Timoniuk

Welcome to the **GOTI Design Agency** comprehensive design system documentation. This living document serves as the single source of truth for visual identity, component architecture, development guidelines, and brand strategy.

---

## 📋 Table of Contents

1. [Project Identity](#-project-identity)
2. [Brand Strategy](#-brand-strategy)
3. [Visual Language](#-visual-language)
4. [Component Library](#-component-library)
5. [Project Structure](#-project-structure)
6. [Screen Inventory](#-screen-inventory)
7. [Design Principles](#-design-principles)
8. [Development Guidelines](#-development-guidelines)
9. [Accessibility Standards](#-accessibility-standards)
10. [Performance Optimization](#-performance-optimization)

---

## 💎 Project Identity

**GOTI** is a luxury-focused digital design agency specializing in high-end branding, UI/UX, and immersive digital experiences. The visual identity reflects exclusivity, precision, and modern premium aesthetics.

### Core Information
- **Agency Name**: GOTI Design Agency
- **Founder & Creative Director**: Rodrigo Ordoñez Timoniuk
- **Contact**: 
  - WhatsApp: +549 3464 608289
  - Email: timoniukrodrigo04@gmail.com
  - Portfolio: [gotirot.wixsite.com/actividadeseduca](https://gotirot.wixsite.com/actividadeseduca)
- **Target Experience**: Premium, Minimalist, High-Impact
- **Industry Focus**: Luxury Branding, UI/UX Design, Digital Strategy

### Mission Statement
To craft timeless digital experiences that blend sculptural elegance with functional precision, ensuring every design tells a story of permanence and exclusivity.

---

## 🎯 Brand Strategy

### Target Audience
- **Primary**: High-net-worth individuals and luxury brands seeking premium digital presence
- **Secondary**: Startups and scale-ups aiming for sophisticated brand positioning
- **Tertiary**: Creative professionals seeking collaboration on high-impact projects

### Value Proposition
1. **Exclusivity**: Limited client roster ensures personalized attention
2. **Craftsmanship**: Meticulous attention to detail in every pixel
3. **Innovation**: Cutting-edge design trends merged with timeless aesthetics
4. **Results**: Measurable impact on brand perception and user engagement

### Brand Personality
- **Sophisticated**: Refined taste and cultural awareness
- **Confident**: Bold creative decisions backed by expertise
- **Approachable**: Premium doesn't mean unapproachable
- **Innovative**: Forward-thinking while respecting tradition

---

## 🎨 Visual Language

### Color Palette

#### Primary Colors
| Name | Hex | RGB | Usage | Accessibility |
|:-----|:----|:----|:------|:--------------|
| **Gold Primary** | `#f9d006` | `249, 208, 6` | Brand accents, CTAs, active states, icons | AA on dark backgrounds |
| **Gold Accent** | `#f2b90d` | `242, 185, 13` | Gradients, hover states, highlights | AA on dark backgrounds |

#### Background Colors
| Name | Hex | RGB | Usage |
|:-----|:----|:----|:------|
| **Dark Primary** | `#181711` | `24, 23, 17` | Main dark theme background |
| **Dark Secondary** | `#121212` | `18, 18, 18` | Deep contrast elements, cards |
| **Light Primary** | `#f8f8f5` | `248, 248, 245` | Light theme background |
| **Light Secondary** | `#ffffff` | `255, 255, 255` | Pure white for emphasis |

#### Semantic Colors
| Name | Hex | Usage |
|:-----|:----|:------|
| **Success** | `#10b981` | Confirmations, success states |
| **Warning** | `#f59e0b` | Alerts, important notices |
| **Error** | `#ef4444` | Errors, destructive actions |
| **Info** | `#3b82f6` | Information, neutral notices |

#### Opacity Scale
```css
/* Gold opacity variants */
--gold-10: rgba(249, 208, 6, 0.1);
--gold-20: rgba(249, 208, 6, 0.2);
--gold-30: rgba(249, 208, 6, 0.3);
--gold-50: rgba(249, 208, 6, 0.5);
--gold-60: rgba(249, 208, 6, 0.6);

/* White opacity variants */
--white-5: rgba(255, 255, 255, 0.05);
--white-10: rgba(255, 255, 255, 0.1);
--white-20: rgba(255, 255, 255, 0.2);
--white-40: rgba(255, 255, 255, 0.4);
--white-60: rgba(255, 255, 255, 0.6);
```

### Typography

#### Font Families
```css
/* Primary Display Font */
--font-display: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Secondary Body Font */
--font-body: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Serif Accent Font */
--font-serif: 'Playfair Display', Georgia, serif;

/* Monospace Code Font */
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

#### Type Scale
| Level | Size | Line Height | Weight | Usage |
|:------|:-----|:------------|:-------|:------|
| **H1** | 48px / 3rem | 1.2 | 800 | Page titles, hero headings |
| **H2** | 36px / 2.25rem | 1.3 | 700 | Section headers |
| **H3** | 28px / 1.75rem | 1.4 | 600 | Subsection headers |
| **H4** | 20px / 1.25rem | 1.5 | 600 | Card titles, labels |
| **Body Large** | 18px / 1.125rem | 1.6 | 400 | Prominent body text |
| **Body** | 16px / 1rem | 1.6 | 400 | Standard body text |
| **Body Small** | 14px / 0.875rem | 1.5 | 400 | Secondary text, captions |
| **Caption** | 12px / 0.75rem | 1.4 | 400 | Metadata, timestamps |
| **Micro** | 10px / 0.625rem | 1.3 | 700 | Labels, badges |

#### Letter Spacing
```css
--tracking-tight: -0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
--tracking-ultra: 0.2em;
--tracking-mega: 0.3em;
```

### Spacing System

#### Base Unit: 4px (0.25rem)

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

### Border Radius

```css
--radius-sm: 0.5rem;   /* 8px - Small elements */
--radius-md: 1rem;     /* 16px - Standard cards */
--radius-lg: 2rem;     /* 32px - Large containers */
--radius-xl: 3rem;     /* 48px - Hero sections */
--radius-full: 9999px; /* Fully rounded */
```

### Shadows & Elevation

```css
/* Subtle depth */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Card elevation */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
             0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Prominent elements */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
             0 4px 6px -2px rgba(0, 0, 0, 0.05);

/* Modal/overlay */
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
             0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Gold glow effect */
--shadow-gold: 0 0 20px rgba(249, 208, 6, 0.3);
--shadow-gold-lg: 0 0 40px rgba(249, 208, 6, 0.4);
```

### Effects & Animations

#### Transitions
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slower: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```

#### Backdrop Blur
```css
--blur-sm: blur(4px);
--blur-md: blur(8px);
--blur-lg: blur(16px);
--blur-xl: blur(24px);
```

#### Gradients
```css
/* Gold gradient */
--gradient-gold: linear-gradient(135deg, #f9d006 0%, #f2b90d 100%);

/* Dark overlay */
--gradient-dark-overlay: linear-gradient(180deg, 
  rgba(24, 23, 17, 0) 0%, 
  rgba(24, 23, 17, 0.8) 100%);

/* Glassmorphism background */
--gradient-glass: linear-gradient(135deg, 
  rgba(255, 255, 255, 0.1) 0%, 
  rgba(255, 255, 255, 0.05) 100%);
```

---

## 🧩 Component Library

### Buttons

#### Primary Button
```html
<button class="btn-primary">
  <span class="material-symbols-outlined">check</span>
  <span>Primary Action</span>
</button>
```

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: var(--gradient-gold);
  color: var(--color-dark-primary);
  font-weight: 700;
  font-size: 1rem;
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  transition: var(--transition-base);
  box-shadow: var(--shadow-gold);
}

.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-gold-lg);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

#### Secondary Button (Ghost)
```html
<button class="btn-secondary">
  <span class="material-symbols-outlined">arrow_forward</span>
  <span>Secondary Action</span>
</button>
```

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(249, 208, 6, 0.3);
  cursor: pointer;
  backdrop-filter: var(--blur-sm);
  transition: var(--transition-base);
}

.btn-secondary:hover {
  border-color: rgba(249, 208, 6, 0.6);
  background: rgba(255, 255, 255, 0.1);
}
```

### Cards

#### Glass Card
```html
<div class="card-glass">
  <h3 class="card-title">Card Title</h3>
  <p class="card-description">Card description text goes here.</p>
</div>
```

```css
.card-glass {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 2rem;
  backdrop-filter: var(--blur-md);
  transition: var(--transition-base);
}

.card-glass:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(249, 208, 6, 0.3);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-title {
  color: var(--color-gold-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.card-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;
}
```

### Input Fields

```html
<div class="input-group">
  <label for="email" class="input-label">Email Address</label>
  <input type="email" id="email" class="input-field" placeholder="your@email.com">
</div>
```

```css
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-field {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 0.875rem 1rem;
  color: white;
  font-size: 1rem;
  transition: var(--transition-base);
}

.input-field:focus {
  outline: none;
  border-color: var(--color-gold-primary);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(249, 208, 6, 0.1);
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
```

### Navigation

```html
<nav class="navbar">
  <div class="navbar-brand">
    <span class="material-symbols-outlined">pentagon</span>
    <span class="navbar-title">GOTI</span>
  </div>
  <ul class="navbar-menu">
    <li><a href="#" class="navbar-link active">Home</a></li>
    <li><a href="#" class="navbar-link">Portfolio</a></li>
    <li><a href="#" class="navbar-link">Services</a></li>
    <li><a href="#" class="navbar-link">Contact</a></li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(24, 23, 17, 0.8);
  backdrop-filter: var(--blur-lg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-gold-primary);
  font-size: 1.5rem;
  font-weight: 800;
}

.navbar-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: var(--transition-base);
  position: relative;
}

.navbar-link:hover,
.navbar-link.active {
  color: var(--color-gold-primary);
}

.navbar-link.active::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-gold);
}
```

---

## 📦 Project Structure

```
goti/
├── DESIGN.md                          # This file
├── mcp_config.json                    # MCP configuration
├── stitch_goti_welcome_screen/        # Screen modules
│   ├── goti_welcome_screen/
│   │   ├── code.html
│   │   └── screen.png
│   ├── rodrigo_ot_digital_business_card_1/
│   │   ├── code.html
│   │   └── screen.png
│   ├── goti_client_project_dashboard/
│   │   ├── code.html
│   │   └── screen.png
│   └── [... 66 more screen modules]
└── assets/                            # (Future) Shared assets
    ├── images/
    ├── fonts/
    └── icons/
```

### File Naming Conventions

- **Screens**: `goti_[category]_[description]_[variant?]`
- **Components**: `component-[name].html`
- **Styles**: `style-[purpose].css`
- **Scripts**: `script-[functionality].js`
- **Images**: `img-[description]-[size?].{png|jpg|svg|webp}`

---

## 🖼️ Screen Inventory

### Complete Module List (69 Screens)

#### 1. Brand & Identity (8 screens)
| Screen | Purpose | Status |
|:-------|:--------|:-------|
| `goti_welcome_screen` | Flagship entry point | ✅ Active |
| `goti_brand_signature_background` | Animated brand backgrounds | ✅ Active |
| `rodrigo_ot_digital_business_card_1-4` | Founder's digital cards (4 variants) | ✅ Active |
| `rodrigo_o.t._digital_signature` | Digital signature element | ✅ Active |
| `goti_gmail_avatar_glow` | Avatar with glow effect | ✅ Active |
| `goti_gmail_avatar_shimmer_1-2` | Avatar shimmer variants | ✅ Active |

#### 2. Client Experience (12 screens)
| Screen | Purpose | Status |
|:-------|:--------|:-------|
| `goti_animated_welcome_experience_1-2` | Onboarding flows | ✅ Active |
| `goti_client_project_dashboard` | Project tracking interface | ✅ Active |
| `goti_project_detail_view_1-2` | Detailed project views | ✅ Active |
| `goti_project_loading_screen_1-2` | Premium loading states | ✅ Active |
| `goti_client_files_&_documents` | File management | ✅ Active |
| `goti_client_testimonials_carousel` | Social proof display | ✅ Active |
| `goti_thank_you_for_your_trust_screen_1-2` | Gratitude screens | ✅ Active |

#### 3. Studio & Services (9 screens)
| Screen | Purpose | Status |
|:-------|:--------|:-------|
| `goti_the_studio_section_1-3` | Agency showcase | ✅ Active |
| `goti_design_services_menu` | Service offerings | ✅ Active |
| `goti_curated_portfolio_gallery` | Work showcase | ✅ Active |
| `goti_brand_collaborations_grid` | Partner showcase | ✅ Active |
| `goti_visual_branding_guide_1-2` | Brand guidelines | ✅ Active |

#### 4. Communication Tools (15 screens)
| Screen | Purpose | Status |
|:-------|:--------|:-------|
| `goti_designer_chat_center_1-3` | Client collaboration hub | ✅ Active |
| `goti_active_video_call_view` | Video meeting interface | ✅ Active |
| `goti_scheduled_video_calls` | Meeting scheduler | ✅ Active |
| `goti_collaborative_whiteboard_view_1-2` | Design collaboration | ✅ Active |
| `goti_professional_email_signature_1-5` | Email signatures | ✅ Active |
| `goti_inquiry_&_contact_screen_1-2` | Contact forms | ✅ Active |
| `goti_notification_center` | Notification hub | ✅ Active |
| `goti_notification_preferences` | Settings panel | ✅ Active |

#### 5. Social & Marketing (12 screens)
| Screen | Purpose | Status |
|:-------|:--------|:-------|
| `goti_instagram_feed_templates_1-3` | Social media grids | ✅ Active |
| `goti_instagram_stories_templates_1-2` | Story designs | ✅ Active |
| `goti_instagram_highlight_icons` | Profile highlights | ✅ Active |
| `goti_vip_monthly_newsletter_1-2` | Email campaigns | ✅ Active |

#### 6. Business Documents (5 screens)
| Screen | Purpose | Status |
|:-------|:--------|:-------|
| `goti_luxury_design_proposal_1-2` | Client proposals | ✅ Active |
| `goti_luxury_invoice_rodrigo_o.t` | Invoicing template | ✅ Active |
| `goti_official_letterhead_rodrigo_o.t` | Official correspondence | ✅ Active |
| `goti_luxury_corporate_envelope` | Envelope design | ✅ Active |
| `goti_physical_thank_you_card_rodrigo_o.t` | Thank you cards | ✅ Active |

#### 7. Interface Modes & Utilities (8 screens)
| Screen | Purpose | Status |
|:-------|:--------|:-------|
| `goti_light_mode_interface_1-4` | Light theme variants | ✅ Active |
| `goti_loading_animation_screen` | Loading animations | ✅ Active |
| `goti_living_masterpiece_animation_1-3` | Hero animations | ✅ Active |
| `goti_main_menu_studio` | Navigation menu | ✅ Active |
| `goti_luxury_virtual_background_studio` | Video backgrounds | ✅ Active |

---

## 🚀 Design Principles

### 1. Glassmorphism First
**Implementation**: Use `backdrop-blur` and semi-transparent borders to create depth and a contemporary "high-tech" feel.

```css
.glass-element {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
}
```

**When to use**:
- Overlays and modals
- Navigation bars
- Card components
- Floating action buttons

### 2. Micro-Animations
**Implementation**: Subtle `transition-all` and `hover:scale` effects to make interfaces feel alive.

```css
.animated-element {
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.animated-element:hover {
  transform: translateY(-4px) scale(1.02);
}
```

**Animation Guidelines**:
- Keep durations between 150-350ms
- Use easing functions for natural motion
- Avoid animating layout properties (width, height)
- Prefer transform and opacity

### 3. Gold Accents
**Implementation**: Use the primary gold color sparingly to highlight the most important CTAs.

**Usage Hierarchy**:
1. **Primary CTAs**: Full gold background
2. **Secondary elements**: Gold borders or icons
3. **Tertiary accents**: Gold text or subtle glows
4. **Hover states**: Gold highlights

**Don't**:
- Use gold for large background areas
- Combine with other bright colors
- Use for body text (readability issues)

### 4. Luxurious Spacing
**Implementation**: Maintain generous padding and margin to give elements "room to breathe."

**Spacing Rules**:
- Minimum touch target: 44x44px
- Card padding: 2rem (32px) minimum
- Section spacing: 4-6rem (64-96px)
- Element gaps: 1-2rem (16-32px)

### 5. Typography Hierarchy
**Implementation**: Clear visual hierarchy through size, weight, and spacing.

```css
h1 { font-size: 3rem; font-weight: 800; letter-spacing: -0.025em; }
h2 { font-size: 2.25rem; font-weight: 700; letter-spacing: 0em; }
h3 { font-size: 1.75rem; font-weight: 600; letter-spacing: 0.025em; }
```

### 6. Responsive Excellence
**Implementation**: Mobile-first approach with fluid typography and spacing.

**Breakpoints**:
```css
/* Mobile: < 640px (default) */
/* Tablet: >= 640px */
@media (min-width: 640px) { }

/* Desktop: >= 1024px */
@media (min-width: 1024px) { }

/* Large Desktop: >= 1280px */
@media (min-width: 1280px) { }

/* Ultra-wide: >= 1536px */
@media (min-width: 1536px) { }
```

---

## 💻 Development Guidelines

### HTML Structure

#### Semantic Markup
```html
<!-- Good -->
<article class="blog-post">
  <header>
    <h1>Post Title</h1>
    <time datetime="2026-02-15">February 15, 2026</time>
  </header>
  <main>
    <p>Content...</p>
  </main>
  <footer>
    <nav aria-label="Post navigation">...</nav>
  </footer>
</article>

<!-- Avoid -->
<div class="blog-post">
  <div class="header">
    <div class="title">Post Title</div>
    <div class="date">February 15, 2026</div>
  </div>
</div>
```

#### Accessibility Attributes
```html
<!-- Always include -->
<button aria-label="Close dialog" aria-pressed="false">
  <span class="material-symbols-outlined" aria-hidden="true">close</span>
</button>

<img src="logo.png" alt="GOTI Design Agency Logo" />

<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/" aria-current="page">Home</a></li>
  </ul>
</nav>
```

### CSS Best Practices

#### Use CSS Custom Properties
```css
:root {
  --color-primary: #f9d006;
  --spacing-unit: 0.25rem;
}

.element {
  color: var(--color-primary);
  padding: calc(var(--spacing-unit) * 4);
}
```

#### BEM Naming Convention
```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__description { }

/* Modifier */
.card--featured { }
.card--large { }
```

#### Mobile-First Media Queries
```css
/* Base styles (mobile) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 640px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

### JavaScript Guidelines

#### Use Modern ES6+ Syntax
```javascript
// Good
const handleClick = (event) => {
  event.preventDefault();
  const { target } = event;
  console.log(`Clicked: ${target.textContent}`);
};

// Avoid
function handleClick(event) {
  event.preventDefault();
  var target = event.target;
  console.log('Clicked: ' + target.textContent);
}
```

#### Modular Code Structure
```javascript
// utils.js
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US').format(date);
};

// main.js
import { formatDate } from './utils.js';

const today = formatDate(new Date());
```

---

## ♿ Accessibility Standards

### WCAG 2.1 AA Compliance

#### Color Contrast
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

**Testing**: Use browser DevTools or online contrast checkers

#### Keyboard Navigation
```javascript
// Ensure all interactive elements are keyboard accessible
document.querySelectorAll('.interactive').forEach(el => {
  el.setAttribute('tabindex', '0');
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.click();
    }
  });
});
```

#### Screen Reader Support
```html
<!-- Use ARIA labels for icon-only buttons -->
<button aria-label="Search">
  <span class="material-symbols-outlined" aria-hidden="true">search</span>
</button>

<!-- Announce dynamic content changes -->
<div role="status" aria-live="polite" aria-atomic="true">
  Form submitted successfully!
</div>

<!-- Skip navigation link -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

#### Focus Indicators
```css
/* Visible focus states */
:focus-visible {
  outline: 2px solid var(--color-gold-primary);
  outline-offset: 2px;
}

/* Remove default outline only when using custom styles */
button:focus {
  outline: none;
}

button:focus-visible {
  box-shadow: 0 0 0 3px rgba(249, 208, 6, 0.5);
}
```

---

## ⚡ Performance Optimization

### Image Optimization

#### Format Selection
- **Photos**: WebP with JPEG fallback
- **Graphics/Logos**: SVG when possible
- **Icons**: SVG or icon fonts
- **Thumbnails**: WebP at 75% quality

#### Responsive Images
```html
<picture>
  <source 
    srcset="hero-mobile.webp 480w, hero-tablet.webp 768w, hero-desktop.webp 1200w"
    type="image/webp"
  />
  <img 
    src="hero-desktop.jpg" 
    alt="GOTI studio workspace"
    loading="lazy"
    width="1200"
    height="800"
  />
</picture>
```

### CSS Optimization

#### Critical CSS
```html
<!-- Inline critical CSS in <head> -->
<style>
  /* Above-the-fold styles only */
  body { margin: 0; font-family: 'Manrope', sans-serif; }
  .hero { min-height: 100vh; background: #181711; }
</style>

<!-- Load full stylesheet asynchronously -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

#### Minimize Repaints
```css
/* Good - uses transform (GPU accelerated) */
.element:hover {
  transform: translateY(-4px);
}

/* Avoid - triggers layout recalculation */
.element:hover {
  margin-top: -4px;
}
```

### JavaScript Performance

#### Debounce Expensive Operations
```javascript
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Usage
window.addEventListener('resize', debounce(() => {
  console.log('Window resized');
}, 250));
```

#### Lazy Loading
```javascript
// Intersection Observer for lazy loading
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

### Loading Performance Metrics

**Target Metrics**:
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

---

## 🔧 Utility Functions

### Color Manipulation
```javascript
/**
 * Convert hex color to RGBA
 * @param {string} hex - Hex color code
 * @param {number} alpha - Opacity (0-1)
 * @returns {string} RGBA color string
 */
function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Usage
const goldWithOpacity = hexToRgba('#f9d006', 0.5);
// Returns: "rgba(249, 208, 6, 0.5)"
```

### Responsive Utilities
```javascript
/**
 * Check if viewport matches breakpoint
 * @param {string} breakpoint - Breakpoint name
 * @returns {boolean}
 */
function matchesBreakpoint(breakpoint) {
  const breakpoints = {
    'sm': '(min-width: 640px)',
    'md': '(min-width: 768px)',
    'lg': '(min-width: 1024px)',
    'xl': '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)'
  };
  
  return window.matchMedia(breakpoints[breakpoint]).matches;
}

// Usage
if (matchesBreakpoint('lg')) {
  console.log('Desktop view');
}
```

### Animation Utilities
```javascript
/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector
 * @param {number} offset - Offset from top (px)
 */
function smoothScrollTo(selector, offset = 0) {
  const element = document.querySelector(selector);
  if (!element) return;
  
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Usage
smoothScrollTo('#contact-section', 80);
```

### Form Validation
```javascript
/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean}
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate phone number (international format)
 * @param {string} phone - Phone number
 * @returns {boolean}
 */
function isValidPhone(phone) {
  const regex = /^\+?[1-9]\d{1,14}$/;
  return regex.test(phone.replace(/[\s-]/g, ''));
}

// Usage
if (isValidEmail('timoniukrodrigo04@gmail.com')) {
  console.log('Valid email');
}
```

---

## 📱 Contact & Support

### Primary Contact
- **Name**: Rodrigo Ordoñez Timoniuk
- **Role**: Founder & Creative Director
- **WhatsApp**: [+549 3464 608289](https://wa.me/5493464608289)
- **Email**: [timoniukrodrigo04@gmail.com](mailto:timoniukrodrigo04@gmail.com)
- **Portfolio**: [gotirot.wixsite.com/actividadeseduca](https://gotirot.wixsite.com/actividadeseduca)

### Design System Updates
This document is a living resource. For updates, suggestions, or questions about the GOTI design system, please contact the design team.

**Version History**:
- **v2.0** (2026-02-15): Complete redesign with expanded component library and guidelines
- **v1.0** (2026-02-14): Initial design system documentation

---

**© 2024-2026 GOTI Design Agency. All rights reserved.**

*Crafted with precision and passion by Rodrigo Ordoñez Timoniuk*
