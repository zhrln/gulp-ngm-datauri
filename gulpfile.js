/**
 * Created by yanjing on 12/7/15.
 */
var gulp = require("gulp");
var datauri = require("./");

gulp.task('datauri', function() {
    return gulp.src('./demo/*.css')
        .pipe(datauri())
        .pipe(gulp.dest('./dest/'));
});