//应用菜单的实例
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;//加载菜单模块
const app = electron.app;//获取app对象
//得到ipc总线
const ipcMain = require('electron').ipcMain;

let template = [{
    label: '编辑',
    submenu: [{
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    },{
        label: '恢复',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    },{
        type: 'separator'
    },{
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    },{
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    },{
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    },{
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }]
},{
    label: '查看',
    submenu: [{
        label: '文集面板',
        accelerator: 'CmdOrCtrl+P',
        click: function (item, focusedWindow) {
            if(focusedWindow){
                if (focusedWindow.id === 1) {
                    let contents = focusedWindow.webContents;
                    //调用显示隐藏的方法
                    contents.send("notebookpanel-toggle");
                }  
            }
        }
    }
    ,{
        label: '重新加载',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                //重新启动应用
                focusedWindow.reload();
            }
        }
    },{
        type: 'separator'
    },{
        label: '切换开发者工具',
        accelerator: 'CmdOrCtrl+Shift+I',
        click: function (item, focusedWindow) {
            // let focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }
    }]
}];

//应用准备时候事件
app.on('ready', function () {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});


