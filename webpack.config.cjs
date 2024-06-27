const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    core: './src/core.js',
    parramore: './src/parramore.js',
    businesses: './src/businesses.js'
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