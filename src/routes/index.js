const meRouter = require('./me');
const newRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./courses')
function route(app){
    //get

    app.use('/news', newRouter);
    app.use('/courses',courseRouter);
    app.use('/me/',meRouter);
    app.use('/',siteRouter);
}

module.exports = route;