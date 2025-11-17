# Copilot Instructions for dr-noor-zaman-portfolio

## Project Overview
This is a Vite-based React + TypeScript portfolio web app for Dr. Noor Zaman, featuring modular UI components, glassmorphism effects, and dynamic content sections. The codebase is organized for maintainability and rapid UI iteration.

## Architecture & Structure
- **Entrypoint:** `src/main.tsx` mounts `App.tsx`.
- **Main Layout:** `App.tsx` orchestrates the header, sidebar, hero, content, and footer. Sidebar state and section navigation are managed via React state.
- **Components:**
  - High-level: `components/Header.tsx`, `components/Sidebar.tsx`, `components/HeroSection.tsx`, `components/ContentSection.tsx`, `components/Footer.tsx`
  - UI primitives: `components/ui/` (Radix UI wrappers, custom controls, utility functions)
  - Figma assets: `components/figma/`
- **Styling:** Tailwind CSS with custom variables in `styles/globals.css`. Glassmorphism and blur effects are used for overlays and sidebars.
- **Routing:** No client-side routing; navigation is managed by React state (`activeSection`).
- **State Management:** Local React state only; no Redux/MobX.

## Developer Workflows
- **Start Dev Server:**
  ```powershell
  npm run dev
  ```
- **Build for Production:**
  ```powershell
  npm run build
  ```
- **Preview Production Build:**
  ```powershell
  npm run preview
  ```
- **Type Checking:**
  TypeScript is strict; fix all type errors before committing.

## Patterns & Conventions
- **UI Components:**
  - Use Radix UI primitives (see `components/ui/`) for consistent accessibility and styling.
  - Utility function `cn` (in `components/ui/utils.ts`) merges Tailwind and classnames.
  - Use `motion` (framer-motion) for all animations.
- **Section Navigation:**
  - Section IDs: `personal-details`, `awards`, `contact`, etc. Passed via props and managed in state.
  - Sidebar and header both control section navigation.
- **Styling:**
  - Use Tailwind classes and custom CSS variables. Prefer utility-first styling.
  - Glassmorphism: overlays and sidebars use `backdrop-blur` and semi-transparent backgrounds.
- **Assets:**
  - Figma assets imported via `figma:asset/...` syntax.


## External Dependencies
- **Radix UI:** Used for all interactive primitives (accordion, dialog, tabs, etc.).
- **framer-motion:** For animations and transitions.
- **Tailwind CSS:** Utility-first styling, custom variables in `styles/globals.css`.
- **Lucide React:** Icon set for UI elements.

### Tailwind CSS v4 & PostCSS Integration
- **Important:** Tailwind v4 requires the `@tailwindcss/postcss` plugin for PostCSS integration. Do **not** use `tailwindcss` directly as a PostCSS plugin.
- **Install:**
  ```powershell
  npm install @tailwindcss/postcss@latest
  ```
- **Configure:** In `postcss.config.cjs`:
  ```js
  module.exports = {
    plugins: [
      require('@tailwindcss/postcss')(),
      require('autoprefixer'),
    ],
  };
  ```
- **Troubleshooting:**
  - If you see `Unknown at rule @tailwind` or unstyled output, check that `globals.css` is imported in `main.tsx` and that your PostCSS config matches above.
  - If you see plugin errors, ensure you have the latest `@tailwindcss/postcss` installed and remove any direct `tailwindcss` plugin usage.

## Key Files & Directories
- `App.tsx`: Main app layout and state
- `components/`: All major and minor components
- `components/ui/`: UI primitives and utilities
- `styles/globals.css`: Global styles and variables
- `vite.config.ts`: Vite config, including path alias `@` → `src/`
- `tsconfig.json`: TypeScript config, strict mode, path aliases


## Example: Adding a New Section
1. Add section ID to navigation arrays in `Header.tsx` and `Sidebar.tsx`.
2. Update `ContentSection.tsx` to render content for the new section.
3. Use UI primitives from `components/ui/` for consistency.


## Notes
- No backend/API integration; all data is static or hardcoded.
- No test suite detected; add tests if introducing complex logic.
- Keep UI/UX consistent with existing glassmorphism and animation patterns.
- For unstyled output, always check Tailwind/PostCSS config and CSS import in entry file.

---
_Last updated: 2025-10-12_

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgba(0,0,0,0.1)', // or your preferred value
      },
    },
  },
  plugins: [],
};
