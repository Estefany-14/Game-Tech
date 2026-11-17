/**
 * GAMETECH - CONFIGURAÇÃO DE CONEXÃO COM MYSQL
 * Fundadora: Estefany da Cunha | "Jogar é evoluir!"
 *
 * ⚠️ IMPORTANTE: Ajuste as credenciais abaixo para o seu ambiente MySQL local.
 */

const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',       // ← Coloque sua senha do MySQL aqui
  database: process.env.DB_NAME     || 'gametech_db',
  charset:  'utf8mb4',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  // Converte BIGINTs para Number e habilita múltiplos statements no seed
  supportBigNumbers:  true,
  bigNumberStrings:   false,
  multipleStatements: false
};

let pool = null;

/**
 * Retorna (ou cria) o pool de conexões reutilizável.
 */
function getPool() {
  if (!pool) {
    pool = mysql.createPool(DB_CONFIG);
    console.log(`   🗄️  Pool MySQL conectado → ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`);
  }
  return pool;
}

/**
 * Executa uma query com parâmetros e retorna as linhas.
 * @param {string} sql
 * @param {Array} params
 * @returns {Promise<Array>}
 */
async function query(sql, params = []) {
  const p = getPool();
  const [rows] = await p.execute(sql, params);
  return rows;
}

/**
 * Testa a conexão com o banco de dados.
 * @returns {Promise<boolean>}
 */
async function testConnection() {
  try {
    const p = getPool();
    const conn = await p.getConnection();
    await conn.ping();
    conn.release();
    console.log('   ✅ Conexão com MySQL verificada com sucesso!');
    return true;
  } catch (err) {
    console.error('   ❌ Falha ao conectar no MySQL:', err.message);
    console.error('   💡 Certifique-se de que:');
    console.error('      1. O MySQL está rodando na sua máquina');
    console.error('      2. O banco "gametech_db" foi criado (execute o arquivo database/gametech.sql)');
    console.error('      3. As credenciais em database/connection.js estão corretas');
    console.error('');
    console.error('   ⚠️  O servidor continuará rodando com fallback para localStorage no frontend.');
    return false;
  }
}

module.exports = { getPool, query, testConnection, DB_CONFIG };
