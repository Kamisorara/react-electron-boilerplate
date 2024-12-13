import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 获取当前文件路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

const createMainWindow = () => {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'electron', 'preload.js'),
      contextIsolation: true, // 必须启用
      enableRemoteModule: false, // 推荐禁用
    },
  });

  const isDev = !app.isPackaged;
  const indexPath = isDev
  ? 'http://localhost:5173'  // 开发模式下通过 Vite 访问
  : `file://${path.join(__dirname, 'dist', 'index.html')}`;  // 生产模式加载本地文件

  mainWindow.loadURL(indexPath);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createMainWindow();
});
