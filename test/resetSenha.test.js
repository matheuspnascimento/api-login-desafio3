const request = require('supertest');
const app = require('../rest/app');
const usuarios = require('../src/models/usuarioModel');
const { expect } = require('chai');

describe('POST /resetar-senha', () => {
  it('deve resetar a senha do usuário com sucesso', async function () {
    const usuario = 'Matheus';
    const novaSenha = 'novaSenha123';
    const res = await request(app)
      .post('/resetar-senha')
      .send({ usuario, novaSenha });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Senha resetada com sucesso');
    const user = usuarios.find(u => u.usuario === usuario);
    expect(user.senha).to.equal(novaSenha);
    expect(user.tentativas).to.equal(0);
    expect(user.bloqueado).to.be.false;
  });

  it('deve retornar erro de credenciais inválidas', async function () {
    const res = await request(app)
      .post('/resetar-senha')
      .send({ usuario: 'Yuri', novaSenha: 'qualquer' });
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Credenciais inválidas');
  });
}); 