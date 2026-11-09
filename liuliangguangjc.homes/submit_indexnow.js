#!/usr/bin/env node
/**
 * IndexNow 搜索引擎实时推送工具 (Node.js 版) - 流量光机场官网
 * 运行命令: node submit_indexnow.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'indexnow.json');
if (!fs.existsSync(configPath)) {
  console.error('[-] 找不到 indexnow.json 配置文件！');
  process.exit(1);
}

const payload = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const postData = JSON.stringify(payload);

console.log(`[*] 准备向 IndexNow API 提交 ${payload.urlList.length} 个 URL...`);
console.log(`[*] 目标域名: ${payload.host}`);
console.log(`[*] 验证密钥: ${payload.key}`);

const endpoints = [
  'api.indexnow.org',
  'www.bing.com'
];

endpoints.forEach(host => {
  const options = {
    hostname: host,
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'Mozilla/5.0 (compatible; IndexNowClient/1.0; +https://liuliangguangjc.homes)'
    }
  };

  const req = https.request(options, (res) => {
    console.log(`\n[>] 推送至 https://${host}/indexnow`);
    console.log(`[+] 响应状态码: ${res.statusCode} ${res.statusMessage}`);
    
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log(`[🎉] 提交成功！搜索引擎已将网址收录并排队爬取。`);
    } else if (res.statusCode === 422) {
      console.log(`[!] 状态 422: URL 与域名不匹配或正在等待线上 DNS 解析生效。`);
    } else {
      console.log(`[!] 返回状态: ${res.statusCode}`);
    }

    res.on('data', (d) => {
      // 偶尔有额外响应文本
      const text = d.toString();
      if (text) console.log(`    响应内容: ${text}`);
    });
  });

  req.on('error', (e) => {
    console.error(`[-] 推送至 ${host} 失败: ${e.message}`);
  });

  req.write(postData);
  req.end();
});

