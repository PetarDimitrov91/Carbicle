const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const express = require('express');
const hbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const dbInit = require('./services/models/index.js');

const {home} = require('./controllers/home');
const {about} = require('./controllers/about');
const {details} = require('./controllers/details');
const {notFound} = require('./controllers/notFound');

const create = require('./controllers/create');
const edit = require('./controllers/edit');
const deleteCar = require('./controllers/delete');

const login = require('./controllers/login');
const register = require('./controllers/register');

const dataService = require('./services/utils');

startApp().catch(err => {
    console.log(err);
    process.exit(1);
});

async function startApp() {
    await dbInit();
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

    app.route('/login')
        .get(login.get)
        .post(login.post);

    app.route('/register')
        .get(register.get)
        .post(register.post);

    app.all('*', notFound);

    app.listen(config.port, () => console.log(`Server listening on ${config.port}!`));
}
