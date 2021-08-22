const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./config/db');
const handlebars  = require('express-handlebars');
const methodOverride = require('method-override')
const { urlencoded } = require('express');
const SortMiddleware= require('./app/middleware/SortMiddleeware');
const app = express();
const port = 3000;

//Connect to Mongoose
db.connect();

//Route
const route = require('./routes/index');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
//Method Overide
app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware);

//HTTP
app.use(morgan('combined')) ;

//template engine
app.engine('hbs', handlebars({
  extname: '.hbs', 
  helpers: {
    sum:(a,b) => a+b,
    sortable: (field,sort)=> {

      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default:"fas fa-sort",
        asc:"fas fa-sort-amount-up",
        desc:"fas fa-sort-amount-down-alt"
      };

      const types = {
        default: 'desc',
        asc:'desc',
        desc:'asc'
      }

      const icon = icons[sortType]; 
      const type = types[sortType];

      return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
              </a>`
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resources/views'));

// console.log('PATH: ', path.join(__dirname,'resources/views'));

route(app);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})