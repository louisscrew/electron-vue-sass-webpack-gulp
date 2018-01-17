var requireHandle = require;
if(requireHandle){
    (function(win){
        const ipcRenderer = require('electron').ipcRenderer;//渲染进程的ipc

        var ScrewBridge = function(){
            this.init();
        };

        ScrewBridge.prototype = {
            init:function(){
                var _this = this;
                _this.initIpcRenderer();
            }
            ,initIpcRenderer:function(){
                //刷新iframe的方法
                ipcRenderer.on('notebookpanel-toggle', function (event) {
                    if(window.store){
                        if(window.store.$data.notebooksShow==true){
                            window.store.$data.notebooksShow = false;
                        }else{
                            window.store.$data.notebooksShow = true;
                        }
                    }
                });
            }
        }


        win.bridge = new ScrewBridge();

    })(window);
}