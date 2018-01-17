
const gulp = require('gulp'); //加载gulp模块
const path = require('path');//引用path模块
const config = require('../config.js');//得到配置文件
const gulpfilePath = path.resolve(__dirname,'../');

//移动文件出了css意外的所有静态资源
let srcPath = path.join(path.relative(gulpfilePath, config.staticSrcPath), "/**/*");
let noIncludePath = "!" + path.join(path.relative(gulpfilePath, config.staticSrcPath), "/**/*.scss");
let destPath = path.relative(gulpfilePath, config.staticDistPath);
// console.log(noIncludePath)
let movefileTask = function () {
    return  gulp.src([srcPath,noIncludePath])
            .pipe(gulp.dest(destPath));
}
gulp.task('movefile',movefileTask);
module.exports = movefileTask;
