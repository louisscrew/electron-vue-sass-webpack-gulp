const path = require('path');//引用path模块
const gulp = require('gulp'); //加载gulp模块
const config = require('./config.js');//得到配置文件
//让任务能按照顺序执行的插件
const gulpSequence = require('gulp-sequence')
//导入样式处理模块
const cssTask = require("./task/css.js");
//导入清除任务
const cleanTask = require("./task/clean.js");
//移动文件的任务
const moveTask = require("./task/movefile.js");
//得到webpack开发模块
const webpackDev = require("./task/webpack-dev.js");
const webpackRelease = require("./task/webpack-release.js");

let gulpfilePath = path.resolve(__dirname);
//开发执行的任务
gulp.task('development-vue',function(){
    gulpSequence('clean','movefile', 'css:dev', function(){
        //并执行观察样式的变化
        let watchCssPath = path.join(config.staticSrcPath,"/**/*.scss");
        gulp.watch(watchCssPath, ['css:dev']);
        gulp.start("webpack-dev");
    });
});

const electron = require('electron');
const childProcess = require('child_process');
gulp.task('development-app',function(){
    gulpSequence('clean','movefile', 'css:dev', function(){
        //并执行观察样式的变化
        let watchCssPath = path.join(config.staticSrcPath,"/**/*.scss");
        gulp.watch(watchCssPath, ['css:dev']);
        childProcess.spawn(electron, ['..','--development'], { stdio: 'inherit' });
        gulp.start("webpack-dev");
    });
});



//执行发版任务
gulp.task('release-vue',function(){
    //webpack-dev的发布任务
    gulpSequence('clean','movefile', 'css:release',function(){
        gulp.start("webpack-release");
    });
});

