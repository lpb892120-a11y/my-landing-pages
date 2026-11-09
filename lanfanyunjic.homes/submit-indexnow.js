/**
 * IndexNow Batch Submission Script for lanfanyunjic.homes
 * Automatically submits all site URLs to IndexNow (Bing, Yandex, etc.)
 * Run with: node submit-indexnow.js
 */

const https = require('https');

const HOST = 'lanfanyunjic.homes';
const KEY = '7c39e564d7824aa7b82f4510b6cefa81';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/articles/tizi-tuijian.html`,
  `https://${HOST}/articles/kexue-shangwang-zhinan.html`,
  `https://${HOST}/articles/tizi-kepu.html`,
  `https://${HOST}/articles/ai-gongju-shiyong-zhinan.html`,
  `https://${HOST}/articles/clash-jiaocheng.html`,
  `https://${HOST}/articles/shadowrocket-ios-jiaocheng.html`,
  `https://${HOST}/articles/youxi-jiasu-zhinan.html`,
  `https://${HOST}/articles/liumeiti-jiesuo-zhinan.html`,
  `https://${HOST}/articles/iplc-zhuanxian-vs-bgp.html`,
  `https://${HOST}/articles/sing-box-jiaocheng.html`,
  `https://${HOST}/articles/waimao-kuajing-wangluo.html`,
  `https://${HOST}/articles/anquan-yinsi-fanghu.html`
];

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URL_LIST
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

console.log(`[IndexNow] Submitting ${URL_LIST.length} URLs for ${HOST}...`);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`[IndexNow] Response status: ${res.statusCode} ${res.statusMessage}`);
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log(`[IndexNow] Success! URLs were successfully submitted to IndexNow search engine cluster.`);
    } else {
      console.log(`[IndexNow] Response: ${data || '(Empty)'}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`[IndexNow] Request failed: ${e.message}`);
});

req.write(payload);
req.end();

