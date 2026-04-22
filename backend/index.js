const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_seguro';

// Middlewares
app.use(cors()); // Permite requisições do app Expo
app.use(express.json()); // Permite receber JSON no body

// ==========================================
// ROTA: POST /register
// ==========================================
app.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos (nome, email, senha) são obrigatórios' });
  }

  try {
    // 1. Verifica se o email já está cadastrado
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // 2. Criptografa a senha com bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // 3. Salva o usuário no banco de dados
    const [result] = await pool.query(
      'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuário registrado com sucesso', userId: result.insertId });
  } catch (error) {
    console.error('Erro no /register:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// ==========================================
// ROTA: POST /login
// ==========================================
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    // 1. Busca o usuário pelo email
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = users[0];

    // 2. Verifica se a senha provida bate com a do banco
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // 3. Gera o token JWT para autenticação subseqüente
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      message: 'Login realizado com sucesso', 
      token, 
      user: { id: user.id, nome: user.nome, email: user.email } 
    });
  } catch (error) {
    console.error('Erro no /login:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// ==========================================
// MIDDLEWARE PARA PROTEGER ROTAS
// ==========================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Formato experado: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
    req.user = user; // Salva as informações do usuário na requisição
    next();
  });
};

// ==========================================
// ROTA: GET /cupom
// ==========================================
app.get('/cupom', authenticateToken, (req, res) => {
  // Como o usuário passou pelo middleware authenticateToken, a requisição é válida e ele está logado.
  // Podemos retornar o cupom com segurança.
  res.json({ 
    cupom: 'ITALIANA10', 
    desconto: '10%' 
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
