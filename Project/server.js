const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// publicフォルダを静的ファイルとして提供
app.use(express.static('public'));

// JSONデータを受け取るための設定
app.use(express.json());

// ステータス受信エンドポイント
app.post('/api/track', (req, res) => {
  console.log('📡 クライアントからのステータス情報:');
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
