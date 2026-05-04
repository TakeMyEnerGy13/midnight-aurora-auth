# Midnight Aurora Auth

Hand-built SPA authentication screen on `React + Vite + TypeScript` with no UI component libraries.

## Included

- `Email + password` sign-in flow
- inline validation
- loading, error, and success states
- password show/hide toggle
- keyboard-friendly focus states
- dark `Midnight Aurora` theme
- light `Linen` fallback theme

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- Enter an email containing `error` to trigger the mock server error state.
- Theme switcher is included to preview both design directions from the spec.
- `vite.config.ts` uses `base: './'` so the build works on GitHub Pages repo paths.

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Push the repository to GitHub.
2. In GitHub, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` to publish.
