/**
 * IndexNow 自动化 URL 提交脚本
 * 用于向 Bing / Yandex / IndexNow 即时通知新页面发布与更新
 * 执行方式: node push_indexnow.js
 */

const https = require('https');

const host = 'yiyuanjic.mom';
const key = 'e7b952a17df34a2e8c614b102283fcde';
const keyLocation = `https://${host}/${key}.txt`;

const urlList = [
  `https://${host}/`,
  `https://${host}/articles/article-1-ladder-recommendation.html`,
  `https://${host}/articles/article-2-scientific-surfing-guide.html`,
  `https://${host}/articles/article-3-ladder-popularization.html`,
  `https://${host}/articles/article-4-shadowrocket-ios-tutorial.html`,
  `https://${host}/articles/article-5-clash-verge-tutorial.html`,
  `https://${host}/articles/article-6-v2rayn-windows-tutorial.html`,
  `https://${host}/articles/article-7-protocols-ss-ssr-trojan-vless.html`,
  `https://${host}/articles/article-8-streaming-netflix-disney-unlock.html`,
  `https://${host}/articles/article-9-prevent-running-away-guide.html`,
  `https://${host}/articles/article-10-cross-border-ecommerce-network.html`,
  `https://${host}/articles/article-11-game-acceleration-low-latency.html`,
  `https://${host}/articles/article-12-android-clash-v2rayng-guide.html`
];

const payload = JSON.stringify({
  host: host,
  key: key,
  keyLocation: keyLocation,
  urlList: urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log(`[IndexNow] 正在向 IndexNow 官方 API 提交 ${urlList.length} 个页面 URL...`);

const req = https.request(options, (res) => {
  console.log(`[IndexNow] 响应状态码: ${res.statusCode} ${res.statusMessage}`);
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ [IndexNow] 成功提交！搜索引擎（Bing / Yandex等）已收到新页面收录请求。');
    } else {
      console.log(`ℹ️ [IndexNow] 服务器返回: ${responseData || '无额外内容（在域名正式解析生效后可成功广播）'}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ [IndexNow] 请求异常: ${e.message}`);
});

req.write(payload);
req.end();

