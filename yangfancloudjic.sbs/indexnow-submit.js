// IndexNow自动提交脚本
// 用于向Bing和其他支持IndexNow的搜索引擎提交URL更新

const https = require('https');

// 生成随机API密钥（首次运行时）
// 请将此密钥保存并创建对应的验证文件
const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // 请替换为您自己的密钥

// 网站域名
const SITE_DOMAIN = 'yangfancloudjic.sbs';

// 要提交的URL列表
const urls = [
    `https://${SITE_DOMAIN}/`,
    `https://${SITE_DOMAIN}/articles/tizi-tuijian.html`,
    `https://${SITE_DOMAIN}/articles/kexue-shangwang-zhinan.html`,
    `https://${SITE_DOMAIN}/articles/tizi-kepu.html`,
    `https://${SITE_DOMAIN}/articles/ai-gongju-shiyong.html`,
    `https://${SITE_DOMAIN}/articles/vpn-vs-proxy.html`,
    `https://${SITE_DOMAIN}/articles/jichang-xuanze.html`,
    `https://${SITE_DOMAIN}/articles/liulianxiti-jiedu.html`,
    `https://${SITE_DOMAIN}/articles/windows-peizhi.html`,
    `https://${SITE_DOMAIN}/articles/ios-peizhi.html`,
    `https://${SITE_DOMAIN}/articles/android-peizhi.html`,
    `https://${SITE_DOMAIN}/articles/anquan-yinsi.html`,
    `https://${SITE_DOMAIN}/articles/changjian-wenti.html`
];

// IndexNow提交函数
function submitToIndexNow(urls) {
    const data = JSON.stringify({
        host: SITE_DOMAIN,
        key: API_KEY,
        keyLocation: `https://${SITE_DOMAIN}/${API_KEY}.txt`,
        urlList: urls
    });

    const options = {
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log('响应头:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });

        if (res.statusCode === 200) {
            console.log('\nIndexNow提交成功！');
        } else if (res.statusCode === 202) {
            console.log('\nIndexNow提交已接受！');
        } else {
            console.log('\nIndexNow提交可能失败，请检查日志');
        }
    });

    req.on('error', (e) => {
        console.error('提交失败:', e);
    });

    req.write(data);
    req.end();
}

// 执行提交
console.log('开始提交URL到IndexNow...');
console.log(`提交${urls.length}个URL`);
submitToIndexNow(urls);
