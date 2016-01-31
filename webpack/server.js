import path from 'path';
import { DefinePlugin } from 'webpack';
import appConfig, { SRC_PATH } from './app';

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
    ...appConfig.plugins,
    new DefinePlugin({
      'process.argv': 'process.argv',
      'process.env': {
        NODE_ENV: '"production"',
      },
      'process.exit': 'process.exit',
    }),
  ],
};
