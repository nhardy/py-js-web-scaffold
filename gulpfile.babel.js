import gulp from 'gulp';

import del from 'del';
import gutil from 'gulp-util';
import process from 'child_process';
import runSequence from 'run-sequence';
import webpack from 'webpack';
import serverConfig from './webpack/server';
import clientConfig from './webpack/client';

let webServerProcess;

const paths = {
  build: ['build/'],
  pycache: ['**/__pycache__/', '**/*.py[cod]'],
  python: ['server.py', '__init__.py', 'src/**/*.py', '!**/__pycache__/', '!**/*.py[cod]'],
  js: ['src/js/**/*.js'],
  assets: ['src/**/*.styl', 'src/**/*.*(svg|png|jpg)'],
  webpack: ['webpack.config.babel.js'],
  gulp: ['gulpfile.babel.js'],
};

gulp.task('clean', (done) => {
  del.sync(paths.build + paths.pycache);
  done();
});

gulp.task('webpack-server', (done) => {
  runSequence('clean');
  webpack(serverConfig, (error, stats) => {
    if (error) throw new gutil.PluginError('webpack-server', error);

    gutil.log('[webpack-server]', stats.toString({
      colors: true,
    }));

    done();
  });
});

gulp.task('webpack-client', (done) => {
  runSequence('clean');
  webpack(clientConfig, (error, stats) => {
    if (error) throw new gutil.PluginError('webpack-client', error);

    gutil.log('[webpack-client]', stats.toString({
      colors: true,
    }));

    done();
  });
});

gulp.task('server', (done) => {
  if (webServerProcess) webServerProcess.kill();

  gutil.log('[server]', 'Spawning Python Server...');

  webServerProcess = process.spawn('python3', ['__init__.py'], {
    stdio: 'inherit',
  });

  done();
});

gulp.task('watch', () => {
  gulp.watch(paths.stylus + paths.js + paths.webpack, ['webpack-server', 'webpack-client', 'server']);
  gulp.watch(paths.python, ['server']);
});

gulp.task('default', () => {
  runSequence('clean', ['webpack-server', 'webpack-client'], 'server', 'watch');
});
