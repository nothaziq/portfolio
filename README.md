# Haziq — Portfolio

A dark, motion-driven portfolio built with React 19, Vite, Tailwind CSS v4, and
Framer Motion. Designed to feel closer to Linear/Vercel/Framer than a typical
student portfolio template.

## Stack

- **React 19 + Vite** — app shell & build
- **Tailwind CSS v4** — styling, via `@theme` design tokens in `src/index.css`
- **Framer Motion** — all animation: reveals, tilt cards, magnetic buttons, the
  loader, the skills constellation
- **Lenis** — smooth scrolling
- **Lucide React** — icons (brand marks for GitHub/LinkedIn are hand-rolled
  SVGs in `src/components/BrandIcons.jsx`, since recent lucide-react releases
  dropped brand/logo icons)

GSAP and Three.js were deliberately **not** used — Framer Motion plus a small
canvas particle field cover every interaction in the brief without the extra
bundle weight or a 3D scene that wouldn't add real value here. Swap them in
under `src/components` if you want to push further (e.g. a true 3D hero).

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/   Reusable UI: cursor, nav, cards, modal, magnetic button, etc.
  sections/     One file per page section (Hero, About, Projects, ...)
  hooks/        useLenis, useMousePosition, useKonamiCode, useCountUp
  constants/    data.js — all content lives here (projects, skills, copy)
  utils/        assistantMatcher.js — the AI assistant's keyword matching
```

### Adding a new project

Add an entry to the `PROJECTS` array in `src/constants/data.js`. The grid in
`src/sections/Projects.jsx` and the modal both read from this array
automatically — no layout changes needed.

### Adding a new skill

Add a node to `SKILL_NODES` in `src/constants/data.js` with an `id`, `label`,
`group` (must match a key in `SKILL_GROUPS`), and a `weight` between 0–1
(controls node size). The constellation in
`src/components/SkillConstellation.jsx` lays itself out automatically.

### Editing the AI assistant's answers

`AI_ASSISTANT_QA` in `src/constants/data.js` is a list of
`{ q, keywords, a }` entries. `src/utils/assistantMatcher.js` scores the
visitor's input against `keywords` and returns the best match, or a fallback
if nothing scores above zero. No backend involved.

### Contact form (EmailJS)

The form in `src/sections/Contact.jsx` sends messages via
[EmailJS](https://www.emailjs.com), so submissions land in your inbox with no
backend server required. It needs three values, read from environment
variables at build time.

1. **Create an account** at [emailjs.com](https://www.emailjs.com) and verify
   your email.
2. **Add an email service** (Email Services → Add New Service — Gmail,
   Outlook, or any SMTP account works). This gives you a **Service ID**.
3. **Create a template** (Email Templates → Create New Template) with
   `{{name}}`, `{{email}}`, and `{{message}}` variables in the body so the
   form fields map through correctly. This gives you a **Template ID**.
4. **Grab your Public Key** from Account → General.
5. Copy `.env.example` to `.env.local` and fill in the three values:

   ```bash
   cp .env.example .env.local
   ```

   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

`.env.local` is gitignored (matched by `*.local`) and never committed. Restart
`npm run dev` after adding or changing these values, since Vite only reads
`VITE_*` env vars at startup.

## Easter eggs

- **Konami code** (`↑ ↑ ↓ ↓ ← → ← → b a`) anywhere on the page shows a toast.
- Open devtools and run `haziq()` in the console.

## Notes on performance & accessibility

- `prefers-reduced-motion` is respected: Lenis smoothing, the particle field,
  and all CSS animations fall back to instant/static states.
- Custom cursor only activates on fine-pointer devices (`pointer: fine`), so
  touch devices keep native scrolling/tapping untouched.
- Focus states are visible (`:focus-visible` outline) throughout.
- Images aren't used anywhere yet (icons are SVG, project "screenshots" are
  copy-first placeholders) — swap in real project screenshots via the
  `PROJECTS` array whenever you have them, and remember to compress/lazy-load.
