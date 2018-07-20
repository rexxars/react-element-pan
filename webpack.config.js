const path = require('path')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'element-pan.js'),
  output: {
    library: 'ReactElementPan',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'umd'),
    filename: 'element-pan.js'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
