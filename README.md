# Bending Toward Justice: Mapping

This project uses JavaScript (Node.js) to process and prepare files for later web deployment.

1) Make sure Node.js is installed locally.
2) Run `npm i`

## Project Commands

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

## Adding Files and Updating WebPack

Internally, WebPack is used to parse and package JavaScript code from the Node.js runtime for use in web browsers. Ideally, each interactive element (e.g. a Leaflet map) should be its own file, with its own code, in the `site/src` folder.

When adding a new interactivable element, two steps are required.

### Updating Entry Points

First, make sure the file exists as a `entry` point for WebPack. When processing JavaScript, WebPack begins from each entry and collects up all of its dependencies as a single, web-ready file.

For example, the entry section of the `webpack.config.cjs` file might look like the following:

```javascrript
entry: {
    core: './src/site/core.js',
    businesses: './src/site/businesses.js',
    regional: './src/site/regional.js',
  },
```

In the above, the `core` file is a collect of dependencies multiple files share. This is built first. Next, two different interactive elements, `businesses` and `regional` are built.

### Adding Packaged Code

Once an entry point exists, and WebPack successfully packages the code, there will be a new file matching the entry point name in the `dist/js` folder.

When using these packaged files, be sure to include the `core` and then the individual interactive element name. For example, a HTML file needing to use the `regional.js` file would need the `core`, shared across the files, and its own individual code as matching the following relative path:

```html
<script src="js/core.js"></script>
<script src="js/regional.js"></script>
```

## Organization

Files are found in four categories:

* General configuration files (`package.json`, etc).
* Source files (found in `src/`) divided into either site (`src/site`) or utilities (`src/utils`).
* Distribution files (found in `dist/`).
* Data files (found in `data/`).

## Demo Hosting on GitHub Pages

Demo space can be found via [GitHub Pages](https://casusscribere.github.io/btj-mapping/dist/).
