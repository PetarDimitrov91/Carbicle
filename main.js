const express = require('express');
const fileUpload = require('express-fileupload');
const hbs = require('express-handlebars');
const {home} = require('./controllers/home');
const {about} = require('./controllers/about');
const {details} = require('./controllers/details');
const create = require('./controllers/create');
const carsService = require('./services/data');

const app = express();

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);

app.set('view engine', 'hbs');

app.use(fileUpload({
    createParentPath: true
}));

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));
app.use(carsService());

app.get('/', home);
app.get('/about', about);
app.get('/details/:id', details);

app.route('/create')
    .get(create.get)
    .post(create.post);

app.listen(3000, () => console.log('it works'));


