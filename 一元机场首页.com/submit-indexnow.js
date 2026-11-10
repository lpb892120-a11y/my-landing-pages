/**
 * 一元机场官网 - IndexNow 批量 URL 自动推送脚本
 * 运行方式: node submit-indexnow.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'indexnow.json'), 'utf8'));

const payload = JSON.stringify({
  host: config.host,
  key: config.key,
  keyLocation: config.keyLocation,
  urlList: config.urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log(`🚀 正在向 IndexNow API 提交 ${config.urlList.length} 个 URL...`);

const req = https.request(options, (res) => {
  console.log(`📡 响应状态码: ${res.statusCode} ${res.statusMessage}`);
  
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log('✅ 提交成功！Bing / Yandex 等搜索引擎已接收到收录抓取请求。');
  } else if (res.statusCode === 400) {
    console.log('⚠️ 请求格式错误，请检查 JSON 格式。');
  } else if (res.statusCode === 403) {
    console.log('⚠️ 密钥未通过验证，请确认网站根目录下是否存在密钥验证文件：' + config.keyLocation);
  } else if (res.statusCode === 422) {
    console.log('⚠️ URL 不属于该 host 域名。');
  } else {
    console.log('ℹ️ 返回状态: ' + res.statusCode);
  }

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error('❌ 推送出错:', e.message);
});

req.write(payload);
req.end();
