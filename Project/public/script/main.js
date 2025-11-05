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
