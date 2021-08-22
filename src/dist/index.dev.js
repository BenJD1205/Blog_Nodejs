"use strict";

var express = require('express');

var morgan = require('morgan');

var path = require('path');

var db = require('./config/db');

var handlebars = require('express-handlebars');

var methodOverride = require('method-override');

var _require = require('express'),
    urlencoded = _require.urlencoded;

var SortMiddleware = require('./app/middleware/SortMiddleeware');

var app = express();
var port = 3000; //Connect to Mongoose

db.connect(); //Route

var route = require('./routes/index');

app.use(express["static"](path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()); //Method Overide

app.use(methodOverride('_method')); //Custom middleware

app.use(SortMiddleware); //HTTP

app.use(morgan('combined')); //template engine

app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    sum: function sum(a, b) {
      return a + b;
    },
    sortable: function sortable(field, sort) {
      var sortType = field === sort.column ? sort.type : 'default';
      var icons = {
        "default": "fas fa-sort",
        asc: "fas fa-sort-amount-up",
        desc: "fas fa-sort-amount-down-alt"
      };
      var types = {
        "default": 'desc',
        asc: 'desc',
        desc: 'asc'
      };
      var icon = icons[sortType];
      var type = types[sortType];
      return "<a href=\"?_sort&column=".concat(field, "&type=").concat(type, "\">\n                <i class=\"").concat(icon, "\"></i>\n              </a>");
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views')); // console.log('PATH: ', path.join(__dirname,'resources/views'));

route(app);
app.listen(port, function () {
  console.log("App listening at http://localhost:".concat(port));
});