const app = require('../rest/app');
const request = require('supertest');
const { expect } = require('chai');
const { resetUsuarios, usuarios } = require('../src/models/usuarioModel');

beforeEach(() => {
  resetUsuarios();
});

describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em string e a mensagem "Login realizado com sucesso" quando eu fizer login com um usuário válido', async () => {
            const response = await request(app)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'usuario': 'Matheus',
                    'senha': '123456'
                })
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Login realizado com sucesso!')
                expect(response.body.token).to.be.a('string')
        })
        it('Deve retornar 401 e a mensagem "Credenciais inválidas" quando eu inserir um usuario e senha inválidos', async () => {
            const response = await request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                'usuario': 'Random',
                'senha': '654321'
            })
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Credenciais inválidas')        
        })
        it('Deve retornar 401 e a mensagem "Senha bloqueada após exceder o limite de 3 tentativas." quando eu inserir um usuário válido com uma senha incorreta 3 vezes', async () => {
            // 1ª tentativa
            await request(app)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'usuario': 'Matheus',
                    'senha': 'senhaerrada1'
                });
            // 2ª tentativa
            await request(app)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'usuario': 'Matheus',
                    'senha': 'senhaerrada2'
                });
            // 3ª tentativa
            const response = await request(app)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'usuario': 'Matheus',
                    'senha': 'senhaerrada3'
                });
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('Senha bloqueada após exceder o limite de 3 tentativas.');
        })    
    })
})

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