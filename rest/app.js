const express = require('express');
const { swaggerUi, swaggerDocument } = require('./config/swagger');
const loginRoutes = require('./routes/loginRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', loginRoutes);
app.use(errorHandler);

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
  });
}

module.exports = app; 