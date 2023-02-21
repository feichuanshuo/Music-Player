const { app, BrowserWindow , ipcMain} = require('electron')

const reload = require('electron-reloader');
reload(module)
const createWindow = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        frame: false,
        webPreferences: {
            // 开启渲染进程使用node
            nodeIntegration: true,
            // 开启渲染进程remote模块
            enableRemoteModule: true,
            // 关闭上下文隔离
            contextIsolation: false,
            preload: __dirname + '/preload.js',
            // 禁用同源策略
            webSecurity: false
        }
    })

    // 加载页面文件
    if (app.isPackaged) {
        // 如果是打包好的就加载打包的 HTML 文件
        win.loadFile('dist/index.html');
    }else {
        // 如果没有打包就直接从本地服务器加载
        win.loadURL('http://localhost:8080');
    }
    ipcMain.on('close-window', () => {
        win.close()
    })
    ipcMain.on('max-window', () => {
        win.maximize()
    })
    ipcMain.on('min-window', () => {
        win.minimize()
    })
}
app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


