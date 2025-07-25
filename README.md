# API de Login com Testes Automatizados

[![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow?logo=javascript)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Express](https://img.shields.io/badge/express-%23404d59.svg?logo=express&logoColor=white)](https://expressjs.com/pt-br/)
[![Mocha](https://img.shields.io/badge/mocha-%238D6748.svg?logo=mocha&logoColor=white)](https://mochajs.org/)
[![Chai](https://img.shields.io/badge/chai-%23A30701.svg?logo=chai&logoColor=white)](https://www.chaijs.com/)
[![Supertest](https://img.shields.io/badge/supertest-333?logo=supertest&logoColor=white)](https://www.npmjs.com/package/supertest)
[![Mochawesome](https://img.shields.io/badge/mochawesome-007ACC?logo=mochawesome&logoColor=white)](https://www.npmjs.com/package/mochawesome)

---

## Objetivo

Projeto educativo desenvolvido como parte do desafio proposto por Julio de Lima na Mentoria 2.0 (curso de teste de software). O objetivo é simular uma API REST de login, controle de tentativas, bloqueio e reset de senha, utilizando IA generativa para a construção da API e testes automatizados para validação dos requisitos.

---

## Stack Utilizada

- **Node.js**
- **Express**
- **Mocha** (testes)
- **Chai** (assertions)
- **Supertest** (testes de API)
- **Mochawesome** (relatórios de teste)
- **Swagger** (documentação interativa)

---

## Estrutura de Diretórios

```
api-login-desafio3/
├── rest/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── swagger.js
│   ├── controllers/
│   │   └── loginController.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── loginRoutes.js
│   └── swagger/
│       └── swagger.json
├── src/
│   ├── models/
│   │   └── usuarioModel.js
│   └── services/
│       └── loginService.js
├── test/
│   ├── login.test.js
│   └── resetarSenha.test.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Como Executar o Projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Inicie a API:**
   ```bash
   node rest/server.js
   ```
   A API estará disponível em: [http://localhost:3000](http://localhost:3000)

3. **Acesse a documentação Swagger:**
   - [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

4. **Execute os testes automatizados:**
   ```bash
   npm test
   ```
   O relatório será gerado automaticamente em `mochawesome-report/mochawesome.html`.

---

## Usuários Cadastrados (Mockados em Memória)

| Usuário  | Senha      |
|----------|------------|
| Matheus  | 123456     |
| Julia    | qwerty     |
| Kojima   | metalgear  |

> **Observação:** Os usuários e senhas são armazenados apenas em memória (não há banco de dados). O objetivo é exclusivamente educativo.

---

## Endpoints Disponíveis

### 1. **POST /login**
Realiza o login do usuário e retorna um token JWT.

**Body:**
```json
{
  "usuario": "Matheus",
  "senha": "123456"
}
```
**Respostas:**
- `200 OK`: Login realizado com sucesso, retorna token JWT.
- `401 Unauthorized`: Credenciais inválidas ou senha bloqueada.
- `500 Internal Server Error`: Erro interno do servidor.

### 2. **POST /resetar-senha**
Permite redefinir a senha de um usuário.

**Body:**
```json
{
  "usuario": "Matheus",
  "novaSenha": "novasenha"
}
```
**Respostas:**
- `200 OK`: Senha resetada com sucesso.
- `401 Unauthorized`: Credenciais inválidas.
- `500 Internal Server Error`: Erro interno do servidor.

### 3. **GET /api-docs**
Acessa a documentação interativa da API via Swagger.

---

## Regras de Negócio

- **Login:**
  - Usuário e senha devem ser válidos.
  - Após 3 tentativas de senha incorreta, a senha do usuário é bloqueada.
  - Mensagens de erro progressivas:
    - 1ª tentativa errada: "Senha incorreta. A senha será bloqueada após mais 2 tentativas"
    - 2ª tentativa errada: "Senha incorreta. A senha será bloqueada na próxima tentativa"
    - 3ª tentativa errada: "Senha bloqueada após exceder o limite de 3 tentativas."
  - Usuário bloqueado não consegue logar até que a senha seja resetada.
  - Ao realizar login com sucesso, tentativas e bloqueio são resetados.

- **Reset de Senha:**
  - Permite redefinir a senha de um usuário existente.
  - Ao resetar a senha, tentativas e bloqueio são resetados.

- **Dados:**
  - Todos os dados são mockados em memória (não persistem após reiniciar a API).
  - Não há integração com banco de dados.

---

## Comandos Úteis

- **Iniciar API:**
  ```bash
  node rest/server.js
  ```
- **Executar testes:**
  ```bash
  npm test
  ```
- **Acessar relatório de testes:**
  Abra o arquivo `mochawesome-report/mochawesome.html` no navegador após rodar os testes.
- **Acessar documentação Swagger:**
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Links Úteis

- [Express](https://expressjs.com/pt-br/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Mochawesome](https://www.npmjs.com/package/mochawesome)
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)

---

## Observações Finais

- Projeto **educativo** para fins de estudo de testes de software e automação.
- Não replique conceitos utilizados aqui em produção, como usuários e senha públicos.