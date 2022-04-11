// REQUIRES
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');


//* EXPRESS *//
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//*MIDDLEWARES*//

app.use(session({
  secret: 'Petitos',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

//* MIDDLEWARE DE APLICACIÓN
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware')
app.use(userLoggedMiddleware);

//*ROUTES*//
const mainRouter = require('./routes/main.routes');
const productsRouter = require('./routes/products.routes');
const usersRouter = require('./routes/users.routes');


app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
