import path from 'path';
import webpack from 'webpack';


const ROOT_DIR = path.resolve(__dirname);
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const BUILD_DIR = path.resolve(ROOT_DIR, 'build');

export default {
  context: SRC_DIR,
};
