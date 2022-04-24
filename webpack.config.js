const path = require('path');
const webpack = require('webpack');
const args = require('command-line-args');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDevelopment = nodeEnv === 'development';
const isProduction = nodeEnv === 'production';

const argsConfig = [
  // cold == no hot reload
  { name: 'cold', alias: 'c', type: Boolean, defaultValue: false },

  // no3d == no gpu load
  { name: 'no3d', alias: 'n', type: Boolean, defaultValue: false },
];

const options = args(argsConfig, { partial: true });
const { cold, no3d } = options;

const mode = isDevelopment ? 'development' : 'production';
let output = {
  filename: '[name].[hash].js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
};
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
      NO_3D: JSON.stringify(no3d),
    },
  }),
  new HtmlWebpackPlugin({
    chunks: ['main'],
    template: 'src/index.html',
    favicon: 'src/common/assets/favicon.webp',
  }),
];

if (isDevelopment) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (isProduction) {
  plugins.push(new CleanWebpackPlugin({ verbose: true }));
  output = {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    publicPath: '/',
  };
}

const devServer = {
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 3000,
  hot: isDevelopment && !cold,
  host: '0.0.0.0',
  disableHostCheck: true,
  historyApiFallback: true,
};

module.exports = {
  devtool: isDevelopment
    ? 'cheap-module-inline-source-map'
    : "sourimport format from '../../../../utilities/date/format';ce-map",
  mode: mode,
  entry: { main: ['@babel/polyfill', './src/index.js'] },
  output: output,
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.((glb)|(hdr)|jpe?g|png|gif|mp4|mp3|ogg|webm)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'static/media/',
          name: '[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: ['raw-loader', 'glslify-loader'],
      },
      {
        // handle fonts
        test: /\.((woff)|(woff2)|(eot)|(ttf)|(otf))$/,
        use: 'url-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
  plugins: plugins,
  devServer: devServer,
};















