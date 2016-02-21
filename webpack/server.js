import path from 'path';
import { BannerPlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { DefinePlugin } from 'webpack';
import appConfig, { BUILD_PATH, SRC_PATH } from './app';

export default {
  ...appConfig,

  entry: path.resolve(SRC_PATH, 'js/server.js'),

  output: {
    ...appConfig.output,
    filename: 'server.js',
  },

  target: 'node',

  node: {
    child_process: 'empty',
    process: 'empty',
  },

  externals: {
    axios: 'require("axios")',
    debug: 'require("debug")',
  },

  plugins: [
    new ExtractTextPlugin('bundle-[contenthash:base64:5].css', {
      allChunks: true,
    }),
    new DefinePlugin({
      __CLIENT__: 'false',
      __SERVER__: 'true',
      BUILD_PATH: JSON.stringify(BUILD_PATH),
      'process.argv': 'process.argv',
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      'process.exit': 'process.exit',
    }),
    new BannerPlugin('require("source-map-support").install();', {
      raw: true,
      entryOnly: false,
    }),
  ],
};
