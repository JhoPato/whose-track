'use strict';
// Tiny static server for Whose Track? (no dependencies).
// Discloud sites must listen on 0.0.0.0:8080; locally you can pass another port: `node server.js 8765`.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.argv[2] || process.env.PORT) || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const PAGE_FILE = path.join(__dirname, 'public', 'index.html');
// Optional: set SPOTIFY_CLIENT_ID in the environment to override the ID written in the page.
const CLIENT_ID = (process.env.SPOTIFY_CLIENT_ID || '').replace(/[^A-Za-z0-9]/g, '');

const PAGE_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-cache',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Robots-Tag': 'noindex, nofollow',
};

function page() {
  let html = fs.readFileSync(PAGE_FILE, 'utf8');
  if (CLIENT_ID) html = html.replace(/const SPOTIFY_CLIENT_ID = '[^']*';/, `const SPOTIFY_CLIENT_ID = '${CLIENT_ID}';`);
  return html;
}

http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return; }
  const { pathname } = new URL(req.url, 'http://localhost');
  if (pathname === '/' || pathname === '/index.html') {
    res.writeHead(200, PAGE_HEADERS);
    res.end(req.method === 'HEAD' ? undefined : page());
    return;
  }
  if (pathname === '/healthz') { res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('ok'); return; }
  if (pathname === '/robots.txt') { res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('User-agent: *\nDisallow: /\n'); return; }
  res.writeHead(302, { Location: '/' });
  res.end();
}).listen(PORT, HOST, () => {
  console.log(`Whose Track? listening on http://${HOST}:${PORT}`);
});
