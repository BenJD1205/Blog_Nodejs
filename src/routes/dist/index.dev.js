"use strict";

var meRouter = require('./me');

var newRouter = require('./news');

var siteRouter = require('./site');

var courseRouter = require('./courses');

function route(app) {
  //get
  app.use('/news', newRouter);
  app.use('/courses', courseRouter);
  app.use('/me/', meRouter);
  app.use('/', siteRouter);
}

module.exports = route;