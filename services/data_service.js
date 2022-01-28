const Car = require('./models/Car');

async function getAll(query) {
    let cars = await Car.find({}, null, {lean: Object});

    if (query.search) {
        cars = cars.filter(c => c.name.toLowerCase().includes(query.search.toLocaleLowerCase()));
    }

    if (query.from) {
        cars = cars.filter(c => c.price >= Number(query.from));
    }

    if (query.to) {
        cars = cars.filter(c => c.price <= Number(query.to));
    }
    return cars;
}

async function getById(id) {
    return Car.findById(id, null, {lean: Object});
}

module.exports = {
    getAll,
    getById
}