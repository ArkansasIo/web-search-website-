# Web Search Website

A responsive, provider-configurable web search portal with a static frontend and an optional Node.js API for health checks and server-side search-provider integrations.

## Features

- Responsive, accessible search home page.
- Search suggestions can be added without changing the page structure.
- Search provider selector with safe URL construction.
- Keyboard-friendly controls and mobile layout.
- Optional Express API with `/api/health` and a documented search endpoint.
- GitHub Actions CI smoke checks.
- GitHub Pages deployment for the static frontend.

## Quick start

The static website is in `public/` and can be opened directly in a browser. For local serving and API routes, use Node.js 20 or newer:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The API runs separately using:

```sh
npm run server
```

Copy `.env.example` to `.env` to configure the API port and optional provider settings. Do not commit secrets.

## API

- `GET /api/health` — returns service status.
- `GET /api/search?q=term&provider=duckduckgo` — returns a redirect URL for supported search providers. It does not scrape search results or proxy a third-party engine.

Supported providers: Google, Bing, DuckDuckGo, Brave Search, and Ecosia.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the static frontend on pushes to `main`. In repository Settings → Pages, set the source to **GitHub Actions**. The Pages site is static; the Node API requires a separate Node-capable host.

## Security notes

- Search queries are treated as untrusted input and URL-encoded.
- API responses set basic security headers.
- Search API redirects only use a fixed allowlist of provider URL templates.
- Never put API keys or private configuration into frontend files.

## Project validation

```sh
npm test
npm run build
```

## License

No license is declared yet. Add a LICENSE file before distributing the project if you intend to grant reuse permissions.
