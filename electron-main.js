/*
 * @Author: ckdfs 2459317008@qq.com
 * @Date: 2024-06-06 04:09:43
 * @LastEditors: ckdfs 2459317008@qq.com
 * @LastEditTime: 2024-06-06 04:19:28
 * @FilePath: \agricultural-big-data\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadURL('http://localhost:3000')
  win.setMenuBarVisibility(false)
  win.maximize()
}

app.whenReady().then(createWindow)