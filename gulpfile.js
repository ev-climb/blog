const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
    injectChanges: true,
  });
}

function scripts() {
  return src(['app/js/main.js', 'node_modules/jquery/dist/jquery.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(
      scss({
        outputStyle: 'compressed',
      }),
    )
    .pipe(concat('style.min.css'))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true,
      }),
    )
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

const htmlmin = require('gulp-htmlmin');

function html() {
  return src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}
function build() {
  return src(['app/css/style.min.css', 'app/fonts/**/*', 'app/js/main.min.js'], {
    base: 'app',
  }).pipe(dest('dist'));
}
function watching() {
  watch(['app/js/main.js'], scripts);
  watch(['app/*.html'], html).on('change', browserSync.reload);
  watch(['app/scss/style.scss'], styles);
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
    injectChanges: true,
  });
}
exports.dev = series(styles, scripts, html, watching);
exports.build = series(html, build, styles);

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;

exports.default = parallel(styles, scripts, browsersync, watching);
