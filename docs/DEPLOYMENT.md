# Deployment notes

## GitHub Actions

The workflow at `.github/workflows/pages.yml` builds the Vite site and deploys it to GitHub Pages. The source repository must have Pages enabled for GitHub Actions deployment.

If the first deployment fails with a 404 or "Pages site not found", open:

https://github.com/ArkansasIo/web-search-website-/settings/pages

Under **Build and deployment**, choose **GitHub Actions** as the source and save. Then rerun the **Deploy GitHub Pages** workflow from the Actions tab.

## Important

GitHub Pages only hosts the static frontend. The Express API in `server/` must be deployed to a Node.js host separately. The search homepage currently opens searches using the user's chosen provider; it does not scrape third-party results.
