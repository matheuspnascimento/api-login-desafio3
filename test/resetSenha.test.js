const request = require('supertest');
const app = require('../rest/app');
const usuarios = require('../src/models/usuarioModel');
const { expect } = require('chai');

describe('POST /resetar-senha', () => {
   it('Reset de senha desbloqueia e permite novo login', async function () {
    for (let i = 0; i < 3; i++) {
      await request(app)
        .post('/login')
        .send({ usuario: 'Kojima', senha: 'errada' });
    }
    const reset = await request(app)
      .post('/resetar-senha')
      .send({ usuario: 'Kojima', novaSenha: 'novaSenha123' });
    expect(reset.status).to.equal(200);
    expect(reset.body.message).to.match(/resetada/);
    const login = await request(app)
      .post('/login')
      .send({ usuario: 'Kojima', senha: 'novaSenha123' });
    expect(login.status).to.equal(200);
    expect(login.body).to.have.property('token');
  });
}); 