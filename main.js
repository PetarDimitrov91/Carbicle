const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const express = require('express');
const fileUpload = require('express-fileupload');
const hbs = require('express-handlebars');
const {home} = require('./controllers/home');
const {about} = require('./controllers/about');
const {details} = require('./controllers/details');
const {notFound} = require('./controllers/notFound');
const create = require('./controllers/create');
const edit = require('./controllers/edit');
const deleteCar = require('./controllers/delete');
const carsService = require('./services/data');
const dataService = require('./services/data_service');

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
app.use('/client', express.static('client'));
app.use(carsService());
app.use(dataService());

app.get('/', home);
app.get('/about', about);
app.get('/details/:id', details);

app.route('/create')
    .get(create.get)
    .post(create.post);

app.route('/edit/:id',)
    .get(edit.get)
    .post(edit.post);

app.route('/delete/:id')
    .get(deleteCar.get)
    .post(deleteCar.post);

app.all('*', notFound);

app.listen(config.port, () => console.log(`Server listening on ${config.port}!`));

