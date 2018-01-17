const config = require('../config.js');//得到配置文件
const path = require('path');//引用path模块
const gulp = require('gulp'); //加载gulp模块

const sass = require('gulp-sass');//获取到sass模块
const plumber = require('gulp-plumber');//在执行时出错时不退出进程的插件
const cssnano = require('gulp-cssnano');//用于压缩的插件
const autoprefixer = require('gulp-autoprefixer');//样式浏览器兼容插件，补全各个浏览器的差异
const sourcemaps = require('gulp-sourcemaps');

let gulpfilePath = path.resolve(__dirname,'../');

//css匹配glob 得到的是相对路径
let cssSrcPath = path.join(path.relative(gulpfilePath, config.staticSrcPath), "/**/*.scss");
//css输出的glob相对路径
let cssDestPath = path.relative(gulpfilePath, config.staticDistPath);


const autoprefixerConfig = {
    browers: ['last 2 versions', 'ie >= 9', '> 5% in CN']
    ,cascade: true
};
//开发模式的样式
gulp.task('css:dev', function () {
    return gulp.src(cssSrcPath)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerConfig))
        .pipe(gulp.dest(cssDestPath));
});

//发布模式的样式
gulp.task('css:release', function () {
    return gulp.src(cssSrcPath)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(autoprefixerConfig))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssDestPath));
});
