const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
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
const {isLoggedIn} = require('./services/security');

const service = require('./services/utils');

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

    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: 'auto'}
    }));

    app.use(fileUpload({
        createParentPath: true
    }));

    app.use(express.urlencoded({extended: true}));
    app.use('/static', express.static('static'));
    app.use('/client', express.static('client'));
    app.use(service());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    app.get('/logout', (req, res, next) => {
        req.auth.logout();
        res.redirect('/');
    });

    //TODO -> add guard where is needed

    app.route('/create')
        .get(isLoggedIn(), create.get)
        .post(isLoggedIn(), create.post);

    app.route('/edit/:id',)
        .get(isLoggedIn(), edit.get)
        .post(isLoggedIn(), edit.post);

    app.route('/delete/:id')
        .get(isLoggedIn(), deleteCar.get)
        .post(isLoggedIn(), deleteCar.post);

    app.route('/login')
        .get(login.get)
        .post(login.post);

    app.route('/register')
        .get(register.get)
        .post(register.post);

    app.all('*', notFound);

    app.listen(config.port, () => console.log(`Server listening on ${config.port}!`));
}
