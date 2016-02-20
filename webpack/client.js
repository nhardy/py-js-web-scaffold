import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import appConfig, { JS_PATH } from './app';


export default {
  ...appConfig,
  entry: path.resolve(JS_PATH, 'client.js'),

  plugins: [
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

  output: {
    ...appConfig.output,
    filename: 'dist/bundle-[hash:5].js',
  },
};
