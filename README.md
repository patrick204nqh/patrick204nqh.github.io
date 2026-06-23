[![Website](https://img.shields.io/website?url=https%3A%2F%2Fpatrick204nqh.com&label=patrick204nqh.com)](https://patrick204nqh.com)
[![GitHub Pages](https://img.shields.io/github/deployments/patrick204nqh/patrick204nqh.github.io/github-pages?label=deploy)](https://patrick204nqh.github.io)

Personal website. Built with [Astro](https://astro.build) + [React](https://react.dev) + [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com). Hosted on [GitHub Pages](https://pages.github.com).

## Stack

| Layer | What |
|-------|------|
| Framework | [Astro](https://astro.build) (static output, 0 JS by default) |
| UI | [React](https://react.dev) islands + [shadcn/ui](https://ui.shadcn.com) + [Tailwind CSS](https://tailwindcss.com) |
| 3D | [Three.js](https://threejs.org) — animated ocean scene on the hero |
| Icons | [Lucide](https://lucide.dev) |
| Content | Markdown blog posts via `astro:content` collections |
| Deploy | GitHub Actions → GitHub Pages |

## Dev

```sh
bin/server        # or npm run dev
# opens http://localhost:4321
```

## Build

```sh
npm run build     # outputs to dist/
npm run preview   # preview the build locally
```

## Add components

```sh
npx shadcn@latest add input dialog sheet tabs separator
```

## Deploy

Push to `main`. GitHub Actions builds and deploys automatically.

## License

MIT
