import path from 'path';
import appConfig, { JS_PATH } from './app';


export default {
  ...appConfig,
  entry: path.resolve(JS_PATH, 'client.js'),

  output: {
    ...appConfig.output,
    filename: 'dist/bundle.js',
  },
};
