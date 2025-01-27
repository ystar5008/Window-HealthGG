const { app, BrowserWindow } = require('electron');

let mainWindow; // 전역 변수로 선언하여 GC로 인한 창 종료 방지

app.on('ready', () => {
  // 새 브라우저 창 생성
  mainWindow = new BrowserWindow({
    width: 1024, // 넓은 창
    height: 768, // 높은 창
    resizable: false, // 창 크기 변경 불가
    fullscreen: false, // 전체 화면 비활성화
    backgroundColor: '#ffffff', // 창 배경색
    webPreferences: {
      nodeIntegration: true, // Node.js API 사용 허용
      contextIsolation: false, // contextIsolation 설정 (보안 관련)
    },
  });

  // HTML 파일 또는 URL 로드
  mainWindow.loadFile('index.html'); // 로컬 HTML 파일
  // 또는
  mainWindow.loadURL('http://localhost:3000'); // URL로 로드 (예: Nest.js 서버)

  // 개발자 도구 열기 (선택)
  mainWindow.webContents.openDevTools();
});

// 모든 창이 닫혔을 때 앱 종료
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// macOS에서 앱이 활성화될 때 새로운 창 생성
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
