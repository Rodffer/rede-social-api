const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoute = require('./src/routes/auth');
const userRoute = require('./src/routes/users');
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL,
  {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('-------------------------');
  console.log('Banco de dados conectado!');
  console.log('-------------------------');
});

// middlewares globais da aplicação
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(3200, () => {
  console.log('------------------');
  console.log('Servidor iniciado!');
  console.log('------------------');
});