// Usuários mockados em memória
const initialUsuarios = [
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

const usuarios = [];

function resetUsuarios() {
  usuarios.length = 0;
  initialUsuarios.forEach((u) => usuarios.push({ ...u }));
}

// Inicializa o array na primeira carga
resetUsuarios();

module.exports = { usuarios, resetUsuarios }; 