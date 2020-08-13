const express = require('express');
const morgan = require('morgan');

const rugbyRouter = require('./routes/rugbyRoutes');
const cricketRouter = require('./routes/cricketRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/rugby', rugbyRouter);
app.use('/api/v1/cricket', cricketRouter);

module.exports = app;
