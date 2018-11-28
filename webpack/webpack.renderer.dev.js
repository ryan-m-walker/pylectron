const path = require('path');

module.exports = {
  entry: './app/src/renderer.tsx',
  output: {
    filename: 'renderer.js',
    path: path.join(__dirname, '../app/dist')
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, '../app')
  },
  module: {
    rules: [
      {
        test: /\.ts?x$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: { extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'] }
};
