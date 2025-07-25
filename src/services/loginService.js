const usuarios = require('../models/usuarioModel');

function autenticarUsuario(usuario, senha) {
  const user = usuarios.find(u => u.usuario === usuario);
  if (!user) return { error: 'Credenciais inválidas' };
  if (user.bloqueado) return { error: 'Senha bloqueada após exceder o limite de 3 tentativas.' };
  if (user.senha !== senha) {
    user.tentativas += 1;
    if (user.tentativas >= 3) {
      user.bloqueado = true;
      return { error: 'Senha bloqueada após exceder o limite de 3 tentativas.' };
    }
    if (user.tentativas === 1) {
      return { error: 'Senha incorreta. A senha será bloqueada após mais 2 tentativas' };
    }
    if (user.tentativas === 2) {
      return { error: 'Senha incorreta. A senha será bloqueada na próxima tentativa' };
    }
  }
  user.tentativas = 0;
  user.bloqueado = false;
  return { usuario: user.usuario };
}

function resetarSenha(usuario, novaSenha) {
  const user = usuarios.find(u => u.usuario === usuario);
  if (!user) return { error: 'Credenciais inválidas' };
  user.senha = novaSenha;
  user.tentativas = 0;
  user.bloqueado = false;
  return { message: 'Senha resetada com sucesso' };
}

module.exports = { autenticarUsuario, resetarSenha }; 