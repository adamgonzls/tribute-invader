const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const ghPages       = require('gulp-gh-pages');

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    files: "styles.css",
    // httpd-vhosts.conf users:
    open: "external",
    host: "tribute-invader.test",
    proxy: "tribute-invader.test/public",
    port: 3000
  });

  gulp.watch("./scss/**/*.scss", ['sass']);
  gulp.watch("./public/*.js").on('change', browserSync.reload);
  gulp.watch("./public/*.html").on('change', browserSync.reload);

});
  
gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  //pipe to autoprefixer
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('./public'))
  .pipe(browserSync.stream());
});

gulp.task('deploy', ['sass'], function() {
  return gulp.src("./public/**/*")
  .pipe(ghPages())
});

gulp.task('default', ['serve']);