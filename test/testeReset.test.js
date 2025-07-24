const request = require('supertest');
const app = require('../rest/app');
const usuarios = require('../src/models/usuarioModel');
const { expect } = require('chai');

describe('POST /resetar-senha', () => {
  it('deve resetar a senha do usuário com sucesso', async function () {
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

  it('deve retornar erro de credenciais inválidas', async function () {
    const res = await request(app)
      .post('/resetar-senha')
      .send({ usuario: 'Yuri', novaSenha: 'qualquer' });
    expect(res.status).to.equal(401);
    expect(res.body.message).to.match(/credenciais/i);
  });
}); 