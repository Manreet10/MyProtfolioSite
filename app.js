var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
var logger = require('morgan');


var indexRouter = require('./routes/index.js');

var app = express();

// Create an instance of the handlebars engine
var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: path.join(__dirname, 'views', 'partials'),
  allowProtoPropertiesByDefault: true, // Disable the warning
  helpers: {
    block: function(name) {
        var blocks = this._blocks;
        var content = blocks && blocks[name];
        return content ? content.join('\n') : null;
    },
    
    extend: function(name, context) {
      /*var template = hbs.handlebars.partials[name];
      if (!template) {
        throw new Error('Missing partial: ' + name);
      }
      var compiledTemplate = hbs.handlebars.compile(template);
      return compiledTemplate(context);*/
      var template = hbs.handlebars.partials[name];
      if (!template) {
        // Check if the template is a layout template
        template = hbs.handlebars.partials[name + '.hbs'];
        if (!template) {
          throw new Error('Missing partial or layout: ' + name);
        }
      }
      var compiledTemplate = hbs.handlebars.compile(template);
      return compiledTemplate(context);
    },
    content: function(options) {
      if (typeof options.fn === 'function') {
        return options.fn(this);
      } else {
        return options.fn;
      }
    }
  }
});


app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


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
