# gulp-ngm-datauri
gulp里转换样式图片为base64编码的datauri


### 使用

```
var gulp = require("gulp");
var datauri = require("gulp-ngm-datauri");

gulp.task('datauri', function() {
    return gulp.src('./demo/*.css')
        .pipe(datauri())
        .pipe(gulp.dest('./dest/'));
});
```