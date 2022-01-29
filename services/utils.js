const {getAllCars, getCarById, createCar, deleteCar,editCar} = require('./dataService');

module.exports = () => (req, res, next) => {
    req.storage = {
        getAllCars,
        getCarById,
        createCar,
        deleteCar,
        editCar
    }

    next();
}