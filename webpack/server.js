import path from 'path';
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

  node: {
    child_process: 'empty',
    fs: 'empty',
    process: 'empty',
  },

  plugins: [
    new ExtractTextPlugin('bundle-[contenthash:base64:5].css', {
      allChunks: true,
    }),
    new DefinePlugin({
      BUILD_PATH: JSON.stringify(BUILD_PATH),
      fs: 'require("fs")',
      path: 'require("path")',
      'process.argv': 'process.argv',
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      'process.exit': 'process.exit',
    }),
  ],
};
