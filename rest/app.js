const express = require('express');
const path = require('path');
const { swaggerUi, swaggerDocument } = require('./config/swagger');
const loginRoutes = require('./routes/loginRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// Swagger config
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Login - Desafio',
    version: '1.0.0',
    description: 'API para simulação de login, bloqueio e reset de senha.'
  },
  servers: [
    { url: 'http://localhost:3000' }
  ]
};
const options = {
  swaggerDefinition,
  apis: ['./rest/app.js'],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/', loginRoutes);

// Middleware de erro genérico
app.use(errorHandler);

module.exports = app; 