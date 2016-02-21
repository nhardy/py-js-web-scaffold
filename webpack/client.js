import path from 'path';
import { DefinePlugin } from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import appConfig, { JS_PATH } from './app';


export default {
  ...appConfig,
  entry: path.resolve(JS_PATH, 'client.js'),

  output: {
    ...appConfig.output,
    filename: 'dist/bundle-[hash:5].js',
  },

  target: 'web',

  node: {
    child_process: 'empty',
    fs: 'empty',
    net: 'empty',
    process: 'empty',
  },

  plugins: [
    new DefinePlugin({
      __CLIENT__: 'true',
      __SERVER__: 'false',
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin('dist/bundle-[contenthash:base64:5].css', {
      allChunks: true,
    }),
    new StatsWriterPlugin({
      filename: 'webpackStats.json',
      transform: data => JSON.stringify({
        jsBundle: data.assetsByChunkName.main[0],
        cssBundle: data.assetsByChunkName.main[1],
      }, null, 2),
    }),
  ],
};
