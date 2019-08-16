var gulp =require('gulp')
var $=require('gulp-load-plugins')();//以下所有的插件方法都在这个上面。用法直接$.+后缀名！！！（htmlmin cleanCss）
// var concat = require('gulp-concat') //合并js
// var uglify = require('gulp-uglify') //压缩js
// var rename = require('gulp-rename') //重命名js
// var less=require('gulp-less')        //合并压缩less文件
// var cleanCss=require('gulp-clean-css')//合并压缩css文件
// var htmlMin=require('gulp-htmlmin')  //压缩html文件
// var livereload=require('gulp-livereload') //半自动刷新
// var connect =require('gulp-connect')   //服务方法，（全自动）
var open =require('open') //自动打开页面的插件
//注册任务
gulp.task('js',function () {
    console.log('可以吗')
    //配置任务操作
    return gulp.src('src/js/*.js')//找到目标文件，复制到gulp内存
        .pipe($.concat('build.js')) //管道了合并文件
        .pipe(gulp.dest('dist/js/')) //临时输出文件
        .pipe($.uglify())             //压缩文件
        .pipe($.rename({suffix:'.min'}))//重命名 suffix加后缀名
        .pipe(gulp.dest('dist/js/'))//最终输出
        .pipe($.livereload())  //实时刷新
        .pipe($.connect.reload())//全自动的实时刷新
})
//注册转换less的任务
gulp.task('less',function () {
    return gulp.src('src/less/*.less')
        .pipe($.less())
        .pipe(gulp.dest('src/css'))
        .pipe($.livereload())
        .pipe($.connect.reload())//全自动的实时刷新
})
//注册合并压缩css文件
gulp.task('css',gulp.series(['less'],function () {
    return gulp.src('src/css/*.css')
        .pipe($.concat('bundle.css'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.cleanCss({compatibility:'ie8'}))
        .pipe(gulp.dest('dist/css/'))
        .pipe($.livereload())
        .pipe($.connect.reload())//全自动的实时刷新
}))
//注册压缩html的任务
gulp.task('html',function () {
    return gulp.src('index.html')
        .pipe($.htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'))
        .pipe($.livereload())
        .pipe($.connect.reload())//全自动的实时刷新
})
//注册监视任务
gulp.task('watch',()=>{
    gulp.watch('src/js/*.js',gulp.series(['js'],()=>{

    }));
   gulp.watch(['src/css/*.css','src/less/*.less'],gulp.series(['css'],()=>{

   }))

})
//注册默认任务
gulp.task('default',gulp.series(['js','css','html'],async()=>{  //gulp.parallel并行 gulp.series串行（顺序执行）
    await console.log('Hello World!');
}))
//注册监视任务 (全自动)
gulp.task('server',gulp.series(['default'],function () {
    $.connect.server({
        root:'dist/',
        livereload:true,
        port:5000
    })
    open('http://localhost:5000/')
    gulp.watch('src/js/*.js',gulp.series(['js']));   //注意：在gulp4中多个任务必须放到gulp.parallel   gulp.series 里面
    gulp.watch(['src/css/*.css','src/less/*.less'],gulp.series(['css']))

}))





