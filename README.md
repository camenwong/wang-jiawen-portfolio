# Portfolio V2 (Cargo-inspired, React)

Responsive React portfolio with:

- homepage overview of all projects
- sticky sidebar project menu
- tag-based filtering for long project lists
- project detail page with gallery + local video + YouTube embed

## Tech stack

- React + Vite
- React Router
- Cloudflare Pages-ready SPA (`public/_redirects` included)

## Project structure

- `src/App.jsx` - app layout, routes, sidebar/filter logic
- `src/data/projects.js` - project content and tags
- `src/styles.css` - responsive design system
- `public/media/abyssial/` - first project media assets
- `public/_redirects` - SPA fallback for Cloudflare Pages

## Local development

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Deploy to Cloudflare Pages (free)

1. Push this folder to GitHub.
2. Cloudflare Dashboard -> `Workers & Pages` -> `Create` -> `Pages` -> `Connect to Git`.
3. Select your repo.
4. Build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy.
6. Add custom domain in Pages project settings.

## Content workflow

1. Add/update project entries in `src/data/projects.js`.
2. Drop media into `public/media/<project-slug>/`.
3. Use tags in each project object for sidebar filtering.

## Why screenshots are better than Cargo account access

- no credential sharing
- pixel-accurate design matching
- faster iterate-review loop
