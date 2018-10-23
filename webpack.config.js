const path = require('path')

const { NODE_ENV = 'development' } = process.env

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = {
  mode: NODE_ENV,
  entry: './index.js',
  output: {
    path: OUTPUT_PATH,
    filename: 'index.js',
    library: 'coffeenotes',
    libraryTarget: 'umd'
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
