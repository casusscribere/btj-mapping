# Bending Toward Justice: Mapping

This project uses JavaScript (Node.js) to process and prepare files for later web deployment.

1) Make sure Node.js is installed locally.
2) Run `npm i`

ESLint is used to check for common issues with both JS and HTML:

`npm run lint`

WebPack is used to process and package CSS and JS files:

`npm run build`

Serve is used for local development:

`npm run serve`

ESLint, WebPack, and Serve can combined as a single command:

`npm run all`

Nodemon is combined with the previous command to watch for changes to files and re-running the packaging:

`npm run watch`

## Organization

Files are found in four categories:

* General configuration files (`package.json`, etc).
* Source files (found in `src/`) divided into either site (`src/site`) or utilities (`src/utils`).
* Distribution files (found in `dist/`).
* Data files (found in `data/`).

## Demo Hosting on GitHub Pages

Demo space can be found via [GitHub Pages](https://casusscribere.github.io/btj-mapping/dist/).
