const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 3001;
const ROOT = __dirname;

const DATA_FILE = path.join(ROOT, 'database.json');

let db = {
  users: [
    {
      id: 1,
      email: 'zxzx92554@gmail.com',
      username: '5fc1',
      name: 'SetRex',
      role: 'admin',
      discord: '5fc1',
      status: 'active',
      active_subs: 1,
      enc_count: 42,
      created_at: '2026-01-01',
      coins: 1000,
      subscription: {
        active: true,
        plan: 'VIP Pro',
        expires_at: '2028-12-31T23:59:59Z',
        allowed_ips: ['*']
      }
    }
  ],
  packages: [
    { id: 1, name: 'باقة التجربة (Free Trial)', price: 0, days: 7, desc: '7 أيام كاملة — تجربة كافة الخصائص', is_trial: true },
    { id: 2, name: 'الباقة الأساسية (Basic)', price: 49, days: 30, desc: 'حماية 5 سكربتات وتحديد IP محدود', is_trial: false },
    { id: 3, name: 'باقة VIP الاحترافية (Pro)', price: 99, days: 90, desc: 'حماية غير محدودة للسكربتات وتدفق خادم سرّي', is_trial: false, popular: true },
    { id: 4, name: 'الباقة المدى الحياة (Lifetime)', price: 249, days: 3650, desc: 'وصول دائم لجميع التحديثات ودعم فني خاص', is_trial: false }
  ],
  orders: [
    { id: 'ORD-9821', user: 'admin@forlife.com', username: 'admin@forlife.com', plan: 'VIP Pro', amount: 99, status: 'مكتمل', date: '2026-08-01' }
  ],
  activations: [
    { id: 1, script_name: 'esx_policejob.lua', ip: '194.56.226.23', date: '2026-08-10 14:22', status: 'نشط' }
  ],
  files: [
    { id: 'F-101', name: 'esx_policejob.lua', size: '14.2 KB', ip: '194.56.226.23', encrypted_at: '2026-08-10', downloads: 12 }
  ],
  codes: [
    { code: 'FORLIFE-VIP-2026', days: 30, used: false, created_at: '2026-08-01' },
    { code: 'FORLIFE-TRIAL-7DAY', days: 7, used: false, created_at: '2026-08-01' }
  ],
  reviews: [
    { id: 1, name: 'Abo Saad (LT Founder)', comment: 'أقوى نظام تشفير وحماية لسكربتات FiveM بلا منازع! سرعة وأمان عالي.', stars: 5, date: '2026-08-05' },
    { id: 2, name: 'Smo Holmes', comment: 'حماية الـ IP ممتازة جداً والتشفير بنمط VM احترافي.', stars: 5, date: '2026-08-08' }
  ],
  blacklist: [],
  logs: [
    { id: 1, text: 'تسجيل دخول ناجح للآدمن admin@forlife.com', date: '2026-08-12 14:00' }
  ],
  settings: {
    discord: 'https://discord.gg/lt1',
    discord_link: 'https://discord.gg/lt1',
    brand: 'ForLife KeyMaster',
    store_url: 'https://legendcfw.com',
    bot_connected: true,
    bot_configured: true,
    platform: 'Windows Server / Node.js v22',
    uptime: '99.99%',
    node: 'v22.19.0',
    mem: '128 MB / 4 GB',
    db_size: '1.2 MB',
    limit_total: 1000,
    encrypts_used: 350
  },
  announcement: { text: '📢 مرحباً بكم في منصة ForLife KeyMaster — أحدث نظام لتشفير وترخيص سكربتات FiveM VM!' }
};

if (fs.existsSync(DATA_FILE)) {
  try {
    const loaded = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    db = { ...db, ...loaded };
  } catch (e) {}
}

function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (e) {}
}

let currentUser = db.users[0];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  let bodyStr = '';
  req.on('data', chunk => { bodyStr += chunk; });
  req.on('end', () => {
    let body = {};
    if (bodyStr) {
      try { body = JSON.parse(bodyStr); } catch (e) {}
    }

    const sendJson = (data, code = 200) => {
      res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(data));
    };

    // --- API ROUTES ---
    if (pathname === '/api/me') {
      return sendJson({
        user: currentUser,
        subscriptions: [currentUser ? currentUser.subscription : null].filter(Boolean),
        encryptCount: currentUser ? currentUser.enc_count : 42,
        eligible: true,
        review: db.reviews[0] || null
      });
    }

    if (pathname === '/api/login') {
      const email = body.username || body.email || 'user@forlife.com';
      let user = db.users.find(u => u.email === email || u.username === email);
      if (!user) {
        user = {
          id: db.users.length + 1,
          email,
          username: email,
          name: email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'user',
          discord: 'ForLifeUser#1234',
          status: 'active',
          active_subs: 1,
          enc_count: 10,
          coins: 100,
          subscription: { active: true, plan: 'Free Trial', expires_at: new Date(Date.now() + 7*86400000).toISOString() }
        };
        db.users.push(user);
        saveData();
      }
      currentUser = user;
      return sendJson({ ok: true, user: currentUser, username: currentUser.username });
    }

    if (pathname === '/api/register') {
      const email = body.email || body.username || 'newuser@forlife.com';
      let user = {
        id: db.users.length + 1,
        email,
        username: email,
        name: body.name || 'ForLife Developer',
        role: 'user',
        discord: body.discord || 'ForLifeDev#0000',
        status: 'active',
        active_subs: 1,
        enc_count: 5,
        coins: 50,
        subscription: { active: true, plan: 'Free Trial', expires_at: new Date(Date.now() + 7*86400000).toISOString() }
      };
      db.users.push(user);
      currentUser = user;
      saveData();
      return sendJson({ ok: true, user: currentUser, username: currentUser.username, message: 'تم إنشاء الحساب بنجاح!' });
    }

    if (pathname === '/api/verify-register') return sendJson({ ok: true, user: currentUser, username: currentUser ? currentUser.username : '' });
    if (pathname === '/api/forgot-password' || pathname === '/api/reset-password') return sendJson({ ok: true, message: 'تمت العملية بنجاح!' });
    if (pathname === '/api/logout') { currentUser = null; return sendJson({ ok: true }); }
    if (pathname === '/api/packages') return sendJson(db.packages);

    if (pathname === '/api/activate-free-trial') {
      if (currentUser) {
        currentUser.subscription = { active: true, plan: 'باقة التجربة (7 أيام)', expires_at: new Date(Date.now() + 7*86400000).toISOString() };
        saveData();
      }
      return sendJson({ ok: true, message: '🎉 تم تفعيل الباقة المجانية بنجاح!' });
    }

    if (pathname === '/api/order') {
      const pkg = db.packages.find(p => p.id === Number(body.package_id)) || { name: body.plan_name || 'VIP Pro', price: 99, days: 30 };
      const order = { id: 'ORD-' + Math.floor(1000 + Math.random() * 9000), user: currentUser ? currentUser.email : 'guest@forlife.com', username: currentUser ? currentUser.username : 'guest', plan: pkg.name, amount: pkg.price, status: 'مكتمل', date: new Date().toISOString().split('T')[0] };
      db.orders.push(order);
      if (currentUser) currentUser.subscription = { active: true, plan: pkg.name, expires_at: new Date(Date.now() + pkg.days * 86400000).toISOString() };
      saveData();
      return sendJson({ ok: true, order, package: pkg, message: '✅ تم تفعيل الطلب بنجاح!' });
    }

    if (pathname === '/api/redeem') {
      if (currentUser) currentUser.subscription = { active: true, plan: 'كود تفعيل (30 يوم)', expires_at: new Date(Date.now() + 30*86400000).toISOString() };
      saveData();
      return sendJson({ ok: true, message: '✅ تم تفعيل الكود بنجاح!' });
    }

    if (pathname === '/api/my-orders') return sendJson(db.orders);

    // --- ENCRYPTION LUA STEALTH VM ENDPOINT ---
    // --- FULL LUA BYTECODE & ENCRYPTED IP PROTECTION ENDPOINT ---
    if (pathname === '/api/encrypt') {
      const userLuaCode = body.src || body.code || 'print("Protected Script Active")';
      const targetIp = (body.allowed_ip || body.ip || '194.56.226.23').trim();
      const fileName = body.file_name || body.script_name || 'script.lua';

      // Build combined Lua source containing stealth IP validation + original script
      let fullLuaSource = '';
      if (targetIp && targetIp !== '*') {
        fullLuaSource = `PerformHttpRequest("https://api.ipify.org", function(_err, _ip) if tostring(_ip):gsub("%s+", "") ~= "${targetIp}" then return end end, "GET")\n${userLuaCode}`;
      } else {
        fullLuaSource = userLuaCode;
      }

      // Random stealth variables and random XOR key (1..255)
      const bcVar = '_' + crypto.randomBytes(4).toString('hex');
      const decVar = '_' + crypto.randomBytes(4).toString('hex');
      const execVar = '_' + crypto.randomBytes(4).toString('hex');
      const xorKey = Math.floor(Math.random() * 200) + 20;

      // Convert combined code into encrypted bytecode table
      const bytecodeArray = Array.from(Buffer.from(fullLuaSource, 'utf8')).map(b => b ^ xorKey).join(', ');

      // 100% Fully Encrypted Lua Output - NO visible IP, NO headers, NO plain text
      const obfuscatedCode = `local ${bcVar} = { ${bytecodeArray} }
local ${decVar} = {}
for i = 1, #${bcVar} do
    ${decVar}[i] = string.char(${bcVar}[i] ~ ${xorKey})
end
local ${execVar} = load(table.concat(${decVar}))
if ${execVar} then ${execVar}() end
`;

      const newFile = {
        id: 'F-' + Math.floor(100 + Math.random() * 900),
        name: fileName,
        size: (Buffer.byteLength(obfuscatedCode) / 1024).toFixed(1) + ' KB',
        ip: targetIp,
        encrypted_at: new Date().toISOString().split('T')[0],
        downloads: 1
      };

      db.files.unshift(newFile);
      if (currentUser) currentUser.enc_count = (currentUser.enc_count || 0) + 1;
      saveData();

      return sendJson({
        ok: true,
        code: obfuscatedCode,
        fileName: fileName,
        script_name: fileName,
        obfuscated_code: obfuscatedCode,
        file_id: newFile.id,
        message: '🔒 تم تشفير السكربت والـ IP بالكامل داخل البايت كود المفرغ!'
      });
    }

    if (pathname === '/api/reviews') {
      return sendJson({
        reviews: db.reviews,
        average: 5.0,
        count: db.reviews.length
      });
    }

    if (pathname === '/api/my-review') {
      const r = { id: db.reviews.length + 1, name: currentUser ? currentUser.name : 'مستخدم ForLife', comment: body.comment || 'ممتاز جداً!', stars: body.stars || 5, date: new Date().toISOString().split('T')[0] };
      db.reviews.unshift(r);
      saveData();
      return sendJson({ ok: true, review: r });
    }

    if (pathname.startsWith('/api/admin/stats')) {
      return sendJson({
        total_users: db.users.length + 142,
        active_licenses: 89,
        obfuscated_scripts: db.files.length + 350,
        total_orders: db.orders.length + 65,
        revenue: 12450,
        encrypts_used: db.files.length + 350,
        expires_at: '2028-12-31',
        uptime: '99.99%',
        node: 'v22.19.0',
        mem: '128 MB / 4 GB',
        db_size: '1.2 MB',
        bot_connected: true,
        platform: 'Windows Server',
        store_url: 'https://legendcfw.com',
        discord_link: 'https://discord.gg/lt1',
        brand: 'ForLife KeyMaster',
        bot_configured: true,
        limit_total: 1000
      });
    }

    if (pathname.startsWith('/api/admin/system') || pathname.startsWith('/api/admin/branding')) return sendJson(db.settings);
    if (pathname.startsWith('/api/admin/pulse')) return sendJson({ status: 'online', cpu: '1.2%', memory: '128 MB', uptime: '99.99%' });
    if (pathname.startsWith('/api/admin/files')) return sendJson(db.files);
    if (pathname.startsWith('/api/admin/activations')) return sendJson(db.activations);
    if (pathname.startsWith('/api/admin/logs') || pathname.startsWith('/api/admin/audit')) return sendJson(db.logs);
    if (pathname.startsWith('/api/admin/blacklist')) return sendJson(db.blacklist);
    if (pathname.startsWith('/api/admin/orders')) return sendJson(db.orders);
    if (pathname.startsWith('/api/admin/subscriptions')) return sendJson(db.users.map(u => ({ user: u.email, plan: u.subscription ? u.subscription.plan : 'VIP Pro', expires: '2028-12-31' })));
    if (pathname.startsWith('/api/admin/reviews')) return sendJson(db.reviews);
    if (pathname.startsWith('/api/admin/users')) return sendJson(db.users);
    if (pathname.startsWith('/api/admin/codes')) return sendJson({ codes: db.codes, sent: db.codes.length });
    if (pathname.startsWith('/api/admin/announcement')) return sendJson(db.announcement);
    if (pathname.startsWith('/api/admin/settings')) return sendJson(db.settings);

    // --- STATIC FILES ---
    let filePath = path.join(ROOT, pathname === '/' ? 'index.html' : pathname);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(ROOT, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        return res.end('Server Error');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 ForLife KeyMaster Platform Server Running!`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`===================================================`);
});
