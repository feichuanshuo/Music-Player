const { app, BrowserWindow , ipcMain} = require('electron')
require('@electron/remote/main').initialize()

const reload = require('electron-reloader');
reload(module)
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1020,
        height: 680,
        frame: false,
        webPreferences: {
            // 开启渲染进程使用node
            nodeIntegration: true,
            // 开启渲染进程remote模块
            enableRemoteModule: true,
            // 关闭上下文隔离
            contextIsolation: false,
            // 关闭同源策略
            webSecurity: false,
            preload: __dirname + '/preload.js',
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
    // 关闭窗口
    ipcMain.on('close-window', () => {
        win.close()
    })
    // 最大化窗口
    ipcMain.on('max-window', () => {
        win.maximize()
    })
    // 最小化窗口
    ipcMain.on('min-window', () => {
        win.minimize()
    })
    // 用于在渲染进程中使用主进程
    require('@electron/remote/main').enable(win.webContents)

}
app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


