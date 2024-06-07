const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    core: './src/core.js',
    districts: './src/districts.js',
    papers: './src/papers.js',
    parramore: './src/parramore.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
        }
      }
    ],
  }
};