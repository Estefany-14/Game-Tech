const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// ============================================================
// MySQL Integration
// ============================================================
let dbConnected = false;
let handleApiRequest = null;

async function initDatabase() {
  try {
    const { testConnection } = require('./database/connection');
    const api = require('./routes/api');
    handleApiRequest = api.handleApiRequest;
    dbConnected = await testConnection();
  } catch (err) {
    console.log('   ⚠️  Módulo mysql2 não encontrado. Instale com: npm install mysql2');
    console.log('   ℹ️  O app funcionará normalmente com localStorage (modo offline).\n');
    dbConnected = false;
  }
}

// ============================================================
// MIME Types
// ============================================================
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.sql': 'text/plain; charset=utf-8'
};

// ============================================================
// HTTP Server
// ============================================================
const server = http.createServer(async (req, res) => {
  const reqUrl = req.url.split('?')[0];

  // --- Rota de Status da API ---
  if (reqUrl === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      app: 'GameTech',
      version: '1.0.0',
      founder: 'Estefany da Cunha',
      slogan: 'Jogar é evoluir!',
      database: dbConnected ? 'MySQL Conectado ✅' : 'Offline (localStorage) ⚠️',
      dbConnected: dbConnected,
      timestamp: new Date().toISOString()
    }));
  }

  // --- Rotear chamadas /api/* para o handler MySQL ---
  if (reqUrl.startsWith('/api/')) {
    if (dbConnected && handleApiRequest) {
      return handleApiRequest(req, res);
    } else {
      res.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        error: 'Banco de dados MySQL não conectado.',
        hint: 'Execute o schema SQL e instale mysql2: npm install mysql2',
        fallback: 'O frontend está operando com localStorage.'
      }));
    }
  }

  // --- Servir Arquivos Estáticos ---
  let filePath = path.join(__dirname, reqUrl === '/' ? 'index.html' : reqUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback para index.html (SPA)
        fs.readFile(path.join(__dirname, 'index.html'), (indexErr, indexContent) => {
          if (indexErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 - Página não encontrada');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(indexContent);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Erro no servidor: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// ============================================================
// Inicialização
// ============================================================
async function startServer() {
  console.log('');
  console.log('======================================================');
  console.log('   🎮 GAMETECH - JOGAR É EVOLUIR!');
  console.log('   Empresa fundada por Estefany da Cunha');
  console.log('======================================================');
  console.log('');

  await initDatabase();

  console.log('');

  server.listen(PORT, () => {
    console.log(`   🌐 Servidor ativo em: http://localhost:${PORT}`);
    console.log(`   📡 API REST em:       http://localhost:${PORT}/api/status`);
    console.log(`   🗄️  MySQL:             ${dbConnected ? 'CONECTADO ✅' : 'NÃO CONECTADO (usando localStorage) ⚠️'}`);
    console.log('');
    if (!dbConnected) {
      console.log('   Para ativar o MySQL:');
      console.log('   1. Instale o driver:  npm install mysql2');
      console.log('   2. Execute o schema:  mysql -u root -p < database/gametech.sql');
      console.log('   3. Reinicie:          npm start');
      console.log('');
    }
    console.log('======================================================');
  });
}

startServer();
