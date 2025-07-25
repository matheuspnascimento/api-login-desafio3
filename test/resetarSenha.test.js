const app = require('../rest/app');
const request = require('supertest');
const { expect } = require('chai');
const { resetUsuarios, usuarios } = require('../src/models/usuarioModel');

beforeEach(() => {
  resetUsuarios();
});

describe('POST /resetar-senha', () => {
  it('Deve retornar 200 e a mensagem "Senha resetada com sucesso"', async function () {
    const res = await request(app)
      .post('/resetar-senha')
      .send({ usuario: 'Matheus', novaSenha: 'novaSenha123' });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.match(/resetada/);
    const user = usuarios.find(u => u.usuario === 'Matheus');
    expect(user.senha).to.equal('novaSenha123');
    expect(user.tentativas).to.equal(0);
    expect(user.bloqueado).to.be.false;
  });

  it('Deve retornar 401 e a mensagem "Credenciais inválidas" quando eu tentar resetar a senha de um usuário inexistente', async function () {
    const res = await request(app)
      .post('/resetar-senha')
      .send({ usuario: 'Yuri', novaSenha: 'qualquer' });
    expect(res.status).to.equal(401);
    expect(res.body.message).to.match(/credenciais/i);
  });
}); 