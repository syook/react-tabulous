const webpack = require('webpack');
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');

// Common plugins
let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: "'development'",
    },
  }),
  new webpack.NamedModulesPlugin(),
];

const entry = [path.resolve(path.join(__dirname, './src/index.js'))];

module.exports = {
  mode: 'development',
  name: 'server',
  plugins: plugins,
  target: 'node',
  entry: entry,
  output: {
    publicPath: './lib/',
    path: path.resolve(__dirname, './lib/'),
    filename: 'syook-table.min.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
  node: {
    Buffer: false,
    __dirname: false,
    __filename: false,
    console: false,
    global: false,
    process: false,
    debugger: false,
  },
};
