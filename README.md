# API de Login - Desafio de Teste de Software

API REST simples em Node.js/Express para simular operações de login, controle de tentativas, bloqueio de senha e reset de senha, com documentação via Swagger.

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```
2. Inicie a API:
   ```
   node rest/app.js
   ```

A API estará disponível em: http://localhost:3000

## Endpoints principais

- `POST /login` - Realiza login e retorna JWT
- `POST /resetar-senha` - Simula "Esqueci minha senha" e permite redefinir a senha
- `GET /api-docs` - Documentação Swagger

## Documentação Swagger

Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Exemplo de requisição

### Login
```json
POST /login
{
  "usuario": "alice",
  "senha": "senha123"
}
```

### Resetar senha
```json
POST /resetar-senha
{
  "usuario": "alice",
  "novaSenha": "novasenha"
}
```

## Observações
- Não há banco de dados, os dados são mockados em memória.
- Controle de tentativas e bloqueio de senha por usuário.
- API para fins de estudo/teste. 