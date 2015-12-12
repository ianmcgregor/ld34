const gulp = require('gulp');

// connect
gulp.task('connect', require('./tasks/connect'));

// scripts
gulp.task('js', require('./tasks/scripts').bundle);
gulp.task('js:watch', require('./tasks/scripts').watch);
gulp.task('js:lint', require('./tasks/scripts').lint);

// styles
gulp.task('css', require('./tasks/styles').bundle);
gulp.task('css:watch', require('./tasks/styles').watch);
gulp.task('css:lint', require('./tasks/styles').lint);

// build
gulp.task('build', [
    'js',
    'css'
]);

// watch
gulp.task('watch', [
    'js:watch',
    'css:watch'
]);

// lint
gulp.task('lint', [
    'js:lint',
    'css:lint'
]);

// default
gulp.task('default', [
    'build',
    'connect',
    'watch'
]);
