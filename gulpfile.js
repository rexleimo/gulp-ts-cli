const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const htmlImport = require('gulp-html-import');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const merge = require('merge-stream');


/**
 * 编译html代码
 */
gulp.task('html', () => {
    return gulp.src(['./src/**/*.html', '!./src/components/*.html'])
        .pipe(htmlImport('./src/components/'))
        .pipe(rename(
            {
                dirname: ''
            }
        ))
        .pipe(gulp.dest('dist'))
});

/**
 * 编译webpack
 */
gulp.task('webpack', () => {
    return gulp.src('./src/pages/**/*.ts')
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('dist/assets/js'));
});

/**
 * 编译scss
 */

let SrcDirs = path.resolve(__dirname, 'src', 'pages');

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

/**
 * 编译sass
 */

gulp.task('sass', () => {
    let folders = getFolders(SrcDirs);

    let tasks = folders.map(function (folder) {
        let scssPath = path.join(SrcDirs, folder, '/*.scss');
        return gulp.src(scssPath)
            .pipe(concat(scssPath))
            .pipe(sass())
            .pipe(rename(folder + '.css'))
            .pipe(gulp.dest('./dist/assets/css'));
    });

    return merge(tasks);
});

gulp.task('default', gulp.parallel('html', 'webpack', 'sass'));
