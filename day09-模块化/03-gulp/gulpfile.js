const gulp = require('gulp')
const jshint = require('gulp-jshint')

gulp.task('test', async function () {
  console.log('gulp task test running...')
})

gulp.task('jshint', () => {
  return gulp.src('./src/js/*.js')
    .pipe(jshint({
      esversion: 6,
      asi: true,
      eqeqeq: true
    }))
    .pipe(jshint.reporter('default'))
})