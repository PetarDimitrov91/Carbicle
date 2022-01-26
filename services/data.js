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

async function write(carsData) {
    try {
        await fs.writeFile(filePath, JSON.stringify(carsData, null, 2));
    } catch (err) {
        error(err, 'write');
    }
}

function error(err, type) {
    console.error(`Database ${type} error`);
    console.error(err);
    process.exit(1);
}

/*

async function getAllCars(query) {
    const carData = await read();
    let cars = Object
        .entries(carData)
        .map(([id, v]) => Object.assign({}, {id}, v));

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
 */

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

async function editCar(car, id) {
    const carsData = await read();

    if (carsData[id]) {
        const oldImageUrl = carsData[id].imageUrl;
        if (car.imageUrl) {
            try {
                await fs.unlink(`./static/assets/${oldImageUrl}`);
            } catch (err) {
                console.log(err);
                throw new Error(err);
            }
        } else {
            car.imageUrl = oldImageUrl;
        }

        carsData[id] = car;
        await write(carsData);
    } else {
        throw new Error('There is no such ID in the database');
    }
}

async function deleteCar(id) {
    const carsData = await read();

    if (carsData[id]) {
        try {
            await fs.unlink(`./static/assets/${carsData[id].imageUrl}`);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }

        delete carsData[id];
        await write(carsData);
    } else {
        throw new Error('There is no such ID in the database')
    }
}

module.exports = () => (req, res, next) => {
    req.storage = {
       // getAllCars,
        createCar,
        getById,
        editCar,
        deleteCar
    };
    next();
}