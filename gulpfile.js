'use strict'

let gulp = require('gulp'),
    gutil = require('gulp-util'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),
    shell = require('gulp-shell'),
    less = require('gulp-less'),
    join = require('path').join,
    c = gutil.colors

const LESS_INCLUDES = ['node_modules/skeleton-less/less'],
      STYLES_FOLDER = join(__dirname, 'app/style'),
      STYLES_GLOB = `${STYLES_FOLDER}/**/*.less`

gulp.task('less', function () {
  return gulp.src(STYLES_GLOB)
    .pipe(less({paths: LESS_INCLUDES}))
    .on('error', function (err) {
      gutil.log(c.red('[CSS]'), err.message)
      this.emit('end')
    })
    .pipe(gulp.dest(STYLES_FOLDER))
})

gulp.task('lint', function () {
  return gulp.src(['./app/**/*.js', './app/**/*.jsx'])
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(eslint.failOnError())
})

gulp.task('mocha', ['build'], function () {
  process.env.NODE_ENV = process.env.NODE_ENV || 'test'
  require('babel/register')
  return gulp.src('test/**/*.js', {read: false})
        .pipe(mocha({
          require: 'babel/register',
          ui: 'bdd',
          timeout: '6000',
          reporter: 'spec'
        }))
        .once('error', function (err) {
          gutil.log(c.red('[mocha]'), err.message)
          process.exit(1)
        })
        .once('end', function () { process.exit() })
})

// electron-prebuilt is installed as `node_modules/.bin/electron`
gulp.task('launch', ['build'], function () {
  return gulp
    .src('.')
    .pipe(shell(['electron .' /* --proxy-server=http://localhost:${SERVER_PORT}`*/]))
    .once('end', process.exit)
})

gulp.task('build', ['less'])
gulp.task('test', ['mocha'])
gulp.task('run', ['build', 'launch'])
gulp.task('default', ['run'])
