//创建一个App的对象
const path = require('path');
const electron = require('electron');
const dialog = electron.dialog;//声明dialog
const BrowserWindow = electron.BrowserWindow;//声明BrowserWindow
const app = electron.app;//声明这个是electron全局app对象
const packageInfo = require('../package');
const glob = require('glob');//加载glob模块

let argvs = process.argv.splice(2);
let isDebug = false;
if("--development"==argvs[0]){
    isDebug = true;
}

class App {
    constructor(){
        this.mainWindow = null;
    }

    //创建窗口实例
    createWindow () {
        
        let windowOptions = {
            width: 1100
            ,minWidth: 680
            ,height: 768
            ,title: packageInfo.name
            ,maximizable:true//发布版本不允许最大化
            ,resizable:true//发布版本不允许改变大小
            ,autoHideMenuBar:false
            ,fullscreen:false
            ,fullscreenable:true//是否支持全屏显示
            ,show:true
            ,skipTaskbar:false//是否在任务栏中显示窗口. true则不显示在任务栏，false则显示在任务栏
        };
        //添加开发者工具
        require('devtron').install();
        //创建主窗口实例
        this.mainWindow = new BrowserWindow(windowOptions);
        let mainWindow = this.mainWindow;
        let indexUri = "";
        if(isDebug===true){
            indexUri = "http://localhost:8080/";
        }else{
            indexUri = path.resolve(__dirname, "../index.html");
        }
        mainWindow.loadURL(indexUri);

        //在加载页面时，进程第一次完成绘制时
        mainWindow.once('ready-to-show', function(){
            mainWindow.show();
        });

    }
    loadMainProcess(){
        let files = glob.sync(path.join(__dirname, 'main-process/**/*.js'));
        files.forEach(function (file) {
            require(file)
        });
    }
    //运行的函数
    run(){
        let _this = this;
        let shouldQuit = makeSingleInstance(_this);
        if (shouldQuit) {
            return app.quit();
        }
        //加载主线程所有的模块
        _this.loadMainProcess();
        
        app.on('ready', function () {
            _this.createWindow();
        });

        app.on('window-all-closed', function () {
            app.quit();
        });

        app.on('activate', function () {
            let mainWindow = _this.mainWindow;
            //对于ios系统来说，点击dock则现实主窗口
            if (mainWindow === null) {
                createWindow();
            }else{
                mainWindow.show();
            }
        });

    }
}


//创建实例
function makeSingleInstance (self) {
    let _this = self;
    return app.makeSingleInstance(function () {
        let mainWindow = _this.mainWindow;
        if (mainWindow) {
            mainWindow.show();
            mainWindow.restore();
            mainWindow.focus();
        }
    });
}

module.exports = App;
