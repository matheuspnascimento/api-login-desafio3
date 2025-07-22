const jwt = require('jsonwebtoken');
const { autenticarUsuario, resetarSenha } = require('../../src/services/loginService');

const JWT_SECRET = 'segredo123';

const login = (req, res) => {
  try {
    const { usuario, senha } = req.body;
    const result = autenticarUsuario(usuario, senha);
    if (result.error) {
      return res.status(401).json({ message: result.error });
    }
    const token = jwt.sign({ usuario: result.usuario }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login realizado com sucesso!', token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

const resetarSenhaController = (req, res) => {
  try {
    const { usuario, novaSenha } = req.body;
    const result = resetarSenha(usuario, novaSenha);
    if (result.error) {
      return res.status(401).json({ message: result.error });
    }
    return res.status(200).json({ message: result.message });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = { login, resetarSenhaController }; 