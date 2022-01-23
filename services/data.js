const fs = require('fs/promises');

const filePath = './services/database.json';

async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (err) {
        error(err, 'read');
    }
}

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        error(err, 'write');
    }
}

function error(err, type) {
    console.error(`Database ${type} error`);
    console.error(err);
    process.exit(1);
}

async function getAllCars() {
    const carData = await read();

    return Object
        .entries(carData)
        .map(([id, v]) => Object.assign({}, {id}, v));

}

async function createCar(car) {
    const cars = await read();
    let id;

    do {
        id = nextId();
    } while (cars.hasOwnProperty(id));

    cars[id] = car;

    await write(cars);
}

function nextId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

async function getById(id) {
    const carsData = await read();
    const car = carsData[id];

    if (car) {
        return Object.assign({}, {id}, car);
    } else {
        return undefined;
    }
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAllCars,
        createCar,
        getById,
    };
    next();
}