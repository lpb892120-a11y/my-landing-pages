const http = require('http');
const { spawn } = require('child_process');

const serverProcess = spawn('node', ['server.js'], { cwd: __dirname + '/..' });

setTimeout(() => {
  const routes = [
    '/',
    '/index.html',
    '/articles',
    '/faq',
    '/tutorial-windows',
    '/tutorial-mac',
    '/sitemap',
    '/sitemap.xml',
    '/robots.txt',
    '/css/style.css',
    '/js/main.js',
    '/images/logo.svg',
    '/articles/clash-airport-recommendation-2024'
  ];

  let pending = routes.length;
  let allOk = true;

  routes.forEach(r => {
    http.get(`http://localhost:8000${r}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const ok = res.statusCode === 200;
        if (!ok) allOk = false;
        console.log(`${ok ? '✓' : '✗'} [${res.statusCode}] ${r} (${res.headers['content-type']}) - Length: ${data.length}`);
        pending--;
        if (pending === 0) {
          serverProcess.kill();
          console.log('\nAll test routes result:', allOk ? 'PASSED 100%' : 'FAILED');
          process.exit(allOk ? 0 : 1);
        }
      });
    }).on('error', (err) => {
      console.error('Error fetching', r, err.message);
      serverProcess.kill();
      process.exit(1);
    });
  });
}, 800);

