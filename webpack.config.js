var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/jsx/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './app/assets/js')
  },
  externals: {
    sequelize: 'Sequelize'
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ],
};
