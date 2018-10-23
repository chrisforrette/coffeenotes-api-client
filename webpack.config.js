const path = require('path')

const { NODE_ENV = 'development' } = process.env

module.exports = {
  mode: NODE_ENV,
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'coffeenotes'
    // libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
}
