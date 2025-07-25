// Usuários mockados em memória
const usuarios = [
  { 
    usuario: 'Matheus', 
    senha: '123456', 
    tentativas: 0,
    bloqueado: false 
  },
  { 
    usuario: 'Julia', 
    senha: 'qwerty', 
    tentativas: 0, 
    bloqueado: false 
  },
  { usuario: 'Kojima', 
    senha: 'metalgear', 
    tentativas: 0, 
    bloqueado: false }
];

module.exports = usuarios; 