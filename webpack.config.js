var path = require('path');

module.exports = {
  entry: './src/public/jsx/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist/public/js')
  },
  module: {
    loaders: [
      {
    		test: /\.jsx?$/,
    		exclude: /(node_modules|bower_components)/,
    		loader: 'babel',
    		query: {
    		  presets: ['es2015','react'],
          plugins: ['transform-decorators-legacy']
    		}
      }
    ]
  }
};
