//! Environment Setup
require('express-async-errors');
require('dotenv').config();

//! App Cores
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

//! Extra Secutiry
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');

//! Routes
const authRouter = require('./routes/auth');
const petsRouter = require('./routes/pets');
const requestsRouter = require('./routes/request');
const adoptedRouter = require('./routes/adopted');

//! Middleware
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found');

//! SwaggerUI
// const swaggerUI = require('swagger-ui-express')
// const YAML = require('yamljs')
// const swaggerDocs = YAML.load('./swagger.yaml ')

//! Variable Declaration
const port = process.env.PORT || 3000;
const minutes = 1000 * 60;

app
  .set('trust proxy', 1)
  .use(
    rateLimiter({
      windowMs: 15 * minutes,
      max: 100,
    })
  )
  .use([express.urlencoded({ extended: false }), express.json()])
  .use(helmet())
  .use(cors())
  .use(xss())
  .get('/', (req, res) => {
    res.send('<h1> Welcome to the site </h1>');
  })
  // .use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
  .use('/api/v1/auth', authRouter)
  .use('/api/v1/requests', auth, requestsRouter)
  .use('/api/v1/pets', auth, petsRouter)
  .use('/api/v1/adopted', auth, adoptedRouter)
  .use(notFound);
// .use(errorHandler)

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`app is now listeing at port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

startServer();
