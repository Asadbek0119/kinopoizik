var gulp = require ('gulp');
const autoprefixer  = require('gulp-autoprefixer')
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var watch = require('gulp-watch');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();



gulp.task("style" , style)
 

function style() {
    return gulp.src("./styles/style.css")
    .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 50 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(csso())
        .pipe(rename({
            suffix: ".min",
          }))
          .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
}

gulp.task("watch" , function () {
    return watch("./styles/style.css",style)
})


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./styles/style.css"
        }
    });
});

gulp.task('default', gulp.parallel('server','style','watch'));
