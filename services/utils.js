const {getAllCars, getCarById, createCar, deleteCar, editCar} = require('./dataService');
const {register, login, logout} = require('./auth');

module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    }

    req.storage = {
        getAllCars,
        getCarById,
        createCar,
        deleteCar,
        editCar
    };

    req.auth = {
        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
        logout: () => logout(req.session)
    }

    next();
}