console.log("main.js 読み込まれたよ！");

// IPアドレス取得
fetch('https://api.ipify.org?format=json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('ip').textContent = 'IPアドレス: ' + data.ip;
  });

// Ping測定（擬似）
async function measurePing() {
  const start = performance.now();
  await fetch('https://api.ipify.org?format=json');
  const end = performance.now();
  document.getElementById('ping').textContent = 'Ping: ' + Math.round(end - start) + ' ms';
}
setInterval(measurePing, 3000);

// FPS測定
let lastFrameTime = performance.now();
let frames = 0;
function updateFPS() {
  const now = performance.now();
  frames++;
  if (now - lastFrameTime >= 1000) {
    document.getElementById('fps').textContent = 'FPS: ' + frames;
    frames = 0;
    lastFrameTime = now;
  }
  requestAnimationFrame(updateFPS);
}
updateFPS();

// CPU使用率（簡易版）
function measureCPU() {
  const start = performance.now();
  for (let i = 0; i < 1000000; i++) {
    Math.sqrt(i);
  }
  const end = performance.now();
  const usage = Math.min(100, Math.round((end - start) / 2));
  document.getElementById('cpu').textContent = 'CPU使用率: ' + usage + ' %';
}
setInterval(measureCPU, 5000);

// ダウンロード速度測定（擬似）
async function measureDownloadSpeed() {
  const start = performance.now();
  await fetch('https://via.placeholder.com/1000x1000.png');
  const end = performance.now();
  const speed = (100 / ((end - start) / 1000)).toFixed(2);
  document.getElementById('download').textContent = 'ダウンロード速度: ' + speed + ' KB/s';
}
setInterval(measureDownloadSpeed, 5000);

// アップロード速度測定（擬似）
async function measureUploadSpeed() {
  const data = new Blob([new ArrayBuffer(100000)]);
  const start = performance.now();
  await fetch('https://httpbin.org/post', {
    method: 'POST',
    body: data
  });
  const end = performance.now();
  const speed = (100 / ((end - start) / 1000)).toFixed(2);
  document.getElementById('upload').textContent = 'アップロード速度: ' + speed + ' KB/s';
}
setInterval(measureUploadSpeed, 7000);

// DNS応答時間（擬似）
async function measureDNS() {
  const start = performance.now();
  await fetch('https://example.com');
  const end = performance.now();
  document.getElementById('dns').textContent = 'DNS応答時間: ' + Math.round(end - start) + ' ms';
}
setInterval(measureDNS, 6000);

// WebSocket接続状態
const ws = new WebSocket('wss://echo.websocket.org');
ws.onopen = () => {
  document.getElementById('ws').textContent = 'WebSocket接続: OK';
};
ws.onerror = () => {
  document.getElementById('ws').textContent = 'WebSocket接続: エラー';
};

// ブラウザ情報
document.getElementById('browser').textContent = 'ブラウザ: ' + navigator.userAgent;

// OS情報
document.getElementById('os').textContent = 'OS: ' + navigator.platform;

// バッテリー残量
navigator.getBattery().then(battery => {
  function updateBattery() {
    const level = Math.round(battery.level * 100);
    document.getElementById('battery').textContent = 'バッテリー残量: ' + level + ' %';
  }
  updateBattery();
  battery.addEventListener('levelchange', updateBattery);
});

// 画面解像度
document.getElementById('resolution').textContent =
  '画面解像度: ' + window.screen.width + ' x ' + window.screen.height;

// 位置情報
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    document.getElementById('location').textContent =
      '位置情報: 緯度 ' + latitude.toFixed(4) + ', 経度 ' + longitude.toFixed(4);
  }, () => {
    document.getElementById('location').textContent = '位置情報: 取得失敗';
  });
} else {
  document.getElementById('location').textContent = '位置情報: 非対応';
}

// 接続タイプ
if (navigator.connection) {
  document.getElementById('connection').textContent =
    '接続タイプ: ' + navigator.connection.effectiveType;
} else {
  document.getElementById('connection').textContent = '接続タイプ: 不明';
}

// Renderにステータス情報を送信
function sendStatusToServer() {
  const data = {
    ip: document.getElementById('ip').textContent,
    ping: document.getElementById('ping').textContent,
    fps: document.getElementById('fps').textContent,
    cpu: document.getElementById('cpu').textContent,
    download: document.getElementById('download').textContent,
    upload: document.getElementById('upload').textContent,
    dns: document.getElementById('dns').textContent,
    ws: document.getElementById('ws').textContent,
    browser: document.getElementById('browser').textContent,
    os: document.getElementById('os').textContent,
    battery: document.getElementById('battery').textContent,
    resolution: document.getElementById('resolution').textContent,
    location: document.getElementById('location').textContent,
    connection: document.getElementById('connection').textContent
  };

  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
setTimeout(sendStatusToServer, 8000);

// 🧠 メモリ使用量（対応ブラウザ限定）
function checkMemoryUsage() {
  if (performance.memory) {
    const usedMB = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
    const totalMB = (performance.memory.totalJSHeapSize / 1048576).toFixed(2);
    console.log(`🧠 メモリ使用量: ${usedMB}MB / ${totalMB}MB`);
  } else {
    console.log('🧠 メモリ情報: 非対応ブラウザ');
  }
}
setInterval(checkMemoryUsage, 10000);

// 🌐 ネットワーク詳細
function logConnectionDetails() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    console.log(`🌐 接続タイプ: ${conn.effectiveType}`);
    console.log(`🌐 下り速度: ${conn.downlink} Mbps`);
    console.log(`🌐 RTT: ${conn.rtt} ms`);
    console.log(`🌐 データセーバー: ${conn.saveData ? 'ON' : 'OFF'}`);
  } else {
    console.log('🌐 接続情報: 非対応ブラウザ');
  }
}
logConnectionDetails();

// 🧪 ブラウザ機能チェック
function checkBrowserFeatures() {
  console.log(`🧪 WebGL: ${!!window.WebGLRenderingContext}`);
  console.log(`🧪 WebRTC: ${!!navigator.mediaDevices}`);
  console.log(`🧪 ServiceWorker: ${'serviceWorker' in navigator}`);
  console.log(`🧪 Notification: ${'Notification' in window}`);
}
checkBrowserFeatures();

// 🍪 Cookie & Storage 状態確認
function logStorageStatus() {
  console.log(`🍪 Cookie: ${document.cookie || 'なし'}`);
  console.log(`📦 localStorage: ${JSON.stringify(localStorage)}`);
  console.log(`📦 sessionStorage: ${JSON.stringify(sessionStorage)}`);
}
logStorageStatus();
