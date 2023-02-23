// 在页面运行其他脚本之前预先加载的脚本
// 渲染进程通信工具
window.ipcRenderer = require('electron').ipcRenderer
// 读取文件函数
window.dialog = require("@electron/remote").dialog
// Node.js文件系统
window.fs = require("fs")
// 获取MP3详细信息函数
window.jsmediatags = require("jsmediatags")

window.encoding = require("encoding")

window.iconv = require("iconv-lite")
