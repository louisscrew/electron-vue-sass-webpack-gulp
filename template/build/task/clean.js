const gulp = require('gulp'); //加载gulp模块
const rimraf = require('gulp-rimraf');
const path = require('path');//引用path模块
const config = require("../config");//得到配置文件

const distRootPath = config.distRootPath;
//创建一个删除任务
gulp.task('clean', function(){
    // return rimraf(distRootPath, {force: true});
    return gulp.src(distRootPath).pipe(rimraf({ force: true }));
});