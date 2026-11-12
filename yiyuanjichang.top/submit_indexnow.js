/**
 * 一元机场官网 - IndexNow 批量自动推送脚本
 * 官方标准协议: https://www.indexnow.org/
 * 适用引擎: 必应 (Bing), Yandex, Naver, Seznam 等
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'indexnow.json');
const payload = fs.readFileSync(configPath, 'utf8');

const endpoints = [
  { host: 'api.indexnow.org', path: '/indexnow' },
  { host: 'www.bing.com', path: '/indexnow' }
];

endpoints.forEach(({ host, path: apiPath }) => {
  const req = https.request(
    {
      hostname: host,
      port: 443,
      path: apiPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    },
    res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`[IndexNow] ${host} 响应状态码: ${res.statusCode} (${res.statusCode === 200 ? '推送成功' : (res.statusCode === 202 ? '已接收待处理' : '需验证')})`);
      });
    }
  );

  req.on('error', err => {
    console.error(`[IndexNow] 推送至 ${host} 失败: ${err.message}`);
  });

  req.write(payload);
  req.end();
});

