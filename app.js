const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./app/api/auth/router');
const categoriesRouter = require('./app/api/categories/router');
const booksRouter = require('./app/api/books/router');
const uploadsRouter = require('./app/api/uploads/router');

const url = '/api/v1';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Toko Buku API'
  });
});

// Create API endpoint
app.use(`${url}`, authRouter);
app.use(`${url}`, categoriesRouter);
app.use(`${url}`, booksRouter);
app.use(`${url}`, uploadsRouter);


module.exports = app;
