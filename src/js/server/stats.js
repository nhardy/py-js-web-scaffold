/* global BUILD_PATH */

import fs from 'fs';
import path from 'path';


const STATS_PATH = path.resolve(BUILD_PATH, 'webpackStats.json');
const rawStats = JSON.parse(fs.readFileSync(STATS_PATH));
export default Object.keys(rawStats).reduce((acc, key) => {
  acc[key] = rawStats[key].replace(/^dist\//, '');
  return acc;
}, {});
