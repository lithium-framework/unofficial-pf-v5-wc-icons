const path = require('path');

module.exports = {
  entry: './src/index.ts',  // Point d'entrée de votre application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'out'),
    library: 'MyWebComponentLib',
    libraryTarget: 'umd',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,  // Applique raw-loader sur les fichiers CSS importés avec "bundle-text"
        use: 'raw-loader',
      }
    ],
  },
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimize: true,
  },
};