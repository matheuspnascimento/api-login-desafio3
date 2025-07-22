const express = require('express');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

// Usuários mockados em memória
const usuarios = [
  { usuario: 'Matheus', senha: '123456', tentativas: 0, bloqueado: false },
  { usuario: 'Julia', senha: 'qwerty', tentativas: 0, bloqueado: false },
  { usuario: 'Kojima', senha: 'metalgear', tentativas: 0, bloqueado: false }
];

const JWT_SECRET = 'segredo123';

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *       401:
 *         description: Credenciais inválidas ou senha bloqueada
 *       500:
 *         description: Erro interno do servidor
 */
app.post('/login', (req, res) => {
  try {
    const { usuario, senha } = req.body;
    const user = usuarios.find(u => u.usuario === usuario);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    if (user.bloqueado) {
      return res.status(401).json({ message: 'Senha bloqueada após exceder o limite de 3 tentativas.' });
    }
    if (user.senha !== senha) {
      user.tentativas += 1;
      if (user.tentativas >= 3) {
        user.bloqueado = true;
        return res.status(401).json({ message: 'Senha bloqueada após exceder o limite de 3 tentativas.' });
      }
      if (user.tentativas === 1) {
        return res.status(401).json({ message: 'Senha incorreta. A senha será bloqueada após mais 2 tentativas' });
      }
      if (user.tentativas === 2) {
        return res.status(401).json({ message: 'Senha incorreta. A senha será bloqueada na próxima tentativa' });
      }
    }
    user.tentativas = 0;
    user.bloqueado = false;
    const token = jwt.sign({ usuario: user.usuario }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login realizado com sucesso!', token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

/**
 * @swagger
 * /resetar-senha:
 *   post:
 *     summary: Reseta a senha do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha resetada com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
app.post('/resetar-senha', (req, res) => {
  try {
    const { usuario, novaSenha } = req.body;
    const user = usuarios.find(u => u.usuario === usuario);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    user.senha = novaSenha;
    user.tentativas = 0;
    user.bloqueado = false;
    return res.status(200).json({ message: 'Senha resetada com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Configuração do Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Login - Desafio',
    version: '1.0.0',
    description: 'API para simulação de login, bloqueio e reset de senha.'
  },
  servers: [
    { url: 'http://localhost:3000' }
  ]
};
const options = {
  swaggerDefinition,
  apis: ['./app.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de erro genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
}); 