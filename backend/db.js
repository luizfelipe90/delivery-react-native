const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuração do pool de conexões com o MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'italiana',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Função para garantir que a tabela existe
async function initDB() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    connection.release();
    console.log('Banco de dados inicializado e tabela users verificada.');
  } catch (err) {
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.error(`Erro: O banco de dados '${process.env.DB_NAME || 'italiana'}' não existe.`);
      console.error('Por favor, crie o banco de dados no MySQL antes de iniciar o servidor.');
    } else {
      console.error('Erro ao inicializar o banco de dados:', err);
    }
  }
}

// Inicializa a tabela ao carregar o arquivo
initDB();

module.exports = pool;
