'use strict'

let gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    c = gutil.colors,
    eslint = require('gulp-eslint'),
    bs = require('browser-sync').create(),
    less = require('gulp-less'),
    mocha = require('gulp-mocha'),
    shell = require('gulp-shell'),
    join = require('path').join,
    del = require('del')

const OUTDIR = './dist',
      SERVER_PORT = 8888,
      INDEX_HTML = join(__dirname, 'assets/index.html'),
      DEST_JS_FILE = 'index.js',
      CLIENT_SRC = join(__dirname, 'lib/renderer'),
      CLIENT_MAIN = join(CLIENT_SRC, 'index.js'),
      CSS_GLOB = './assets/css/**/*.less',
      LESS_INCLUDES = ['node_modules/skeleton-less/less'],
      browserifyOpts = {
        entries: [CLIENT_MAIN],
        transform: ['babelify'],
        debug: true
      },
      reloadOpts = {stream: true}

gulp.task('js', function () {
  return browserify(browserifyOpts)
    .bundle()
    .on('error', function (err) {
      gutil.log(c.red('[JS]'), err.toString(), '\n' + err.codeFrame)
      bs.notify('JS error', err)
      this.emit('end')
    })
    .on('log', gutil.log)
    .pipe(source(DEST_JS_FILE))
    .pipe(gulp.dest(OUTDIR))
    .pipe(bs.reload(reloadOpts))
})

gulp.task('less', function () {
  return gulp.src(CSS_GLOB)
    .pipe(less({paths: LESS_INCLUDES}))
    .on('error', function (err) {
      gutil.log(c.red('[CSS]'), err.message)
      bs.notify('CSS error', err)
      this.emit('end')
    })
    .pipe(gulp.dest(OUTDIR))
    .pipe(bs.reload(reloadOpts))
})

gulp.task('html', function () {
  return gulp.src(INDEX_HTML)
    .pipe(gulp.dest(OUTDIR))
    .pipe(bs.reload(reloadOpts))
})

gulp.task('lint', function () {
  return gulp.src([join(CLIENT_SRC, '**/*.js')])
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe(eslint.failOnError())
})

gulp.task('clean', function (done) {
  return del([OUTDIR], done)
})

// TODO Unfortunately this doesn't seem to reload the Electron shell properly.
// gulp will rebuild changes but you will still have to press Ctrl-R to see
// it in the app.
gulp.task('browser-sync', function () {
  bs.init({
    open: false,
    port: SERVER_PORT,
    server: { baseDir: OUTDIR }
  })
})

// TODO build incremental changes like this:
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/incremental-builds-with-concatenate.md
gulp.task('watch', function () {
  gulp.watch(`${CLIENT_SRC}/**/*.js`, ['js', 'lint'])
  gulp.watch(CSS_GLOB, ['less'])
  gulp.watch(INDEX_HTML, ['html'])
})

gulp.task('mocha', ['build', 'browser-sync'], function () {
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

gulp.task('build', ['js', 'less', 'html'])
gulp.task('test', ['mocha'])
gulp.task('run', ['build', 'lint', 'watch', 'launch'])
gulp.task('default', ['run'])
