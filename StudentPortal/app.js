var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/auth');

const assignmentRoutes = require('./routes/assignments');

const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(express.json());

// Routes (example)
app.get('/',(req,res)=>{
  res.send('CORS-enabled API');
});




app.use(express.json());
app.use('/uploads', express.static('uploads')); // for static file access

// Routes
app.use('/auth', authRoutes);
app.use('/assignments', assignmentRoutes);

// Protected test route
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
});

app.listen(4200, () => console.log('Server running on port 4200'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
