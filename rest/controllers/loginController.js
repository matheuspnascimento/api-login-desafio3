const jwt = require('jsonwebtoken');
const { autenticarUsuario, resetarSenha } = require('../../src/services/loginService');

const JWT_SECRET = 'segredo123';
const tentativasFalhas = {};

const login = (req, res) => {
  try {
    const { usuario, senha } = req.body;

    // Inicializa controle de tentativas se ainda não existir
    if (!tentativasFalhas[usuario]) {
      tentativasFalhas[usuario] = { tentativas: 0, bloqueado: false };
    }

    // Verifica se o usuário está bloqueado
    if (tentativasFalhas[usuario].bloqueado) {
      return res.status(403).json({ message: 'Conta bloqueada por excesso de tentativas inválidas.' });
    }

    const result = autenticarUsuario(usuario, senha);


    if (result.error) {
      tentativasFalhas[usuario].tentativas += 1;

      // Bloqueia após 3 tentativas inválidas
      if (tentativasFalhas[usuario].tentativas >= 3) {
        tentativasFalhas[usuario].bloqueado = true;
        return res.status(403).json({ message: 'Conta bloqueada após 3 tentativas inválidas.' });
      }

      return res.status(401).json({
        message: `Credenciais inválidas. Tentativas restantes: ${3 - tentativasFalhas[usuario].tentativas}`
      });
    }

    // Login bem-sucedido → reseta tentativas
    tentativasFalhas[usuario] = { tentativas: 0, bloqueado: false };

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