import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


export const ROOT_PATH = path.resolve(__dirname, '..');
export const SRC_PATH = path.resolve(ROOT_PATH, 'src');
export const JS_PATH = path.resolve(SRC_PATH, 'js');
export const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
export const DIST_PATH = path.resolve(BUILD_PATH, 'dist');

export default {
  stats: {
    children: false,
  },

  output: {
    path: BUILD_PATH,
    publicPath: 'http://localhost:8080/',
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!stylus-loader'
        ),
      },
    ],
  },

  resolve: {
    alias: {
      app: path.resolve(JS_PATH, 'app'),
      server: path.resolve(JS_PATH, 'server'),
    },
    extensions: ['', '.json', '.js'],
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },
};
