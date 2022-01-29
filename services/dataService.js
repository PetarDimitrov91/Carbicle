const Car = require('./models/Car');
const fs = require('fs/promises');

async function getAllCars(query) {
    const queries = {};

    if (query.search) {
        queries.name = new RegExp(query.search, 'i');
    }

    if (query.from) {
        queries.price = {$gte: Number(query.from)}
    }

    if (query.to) {
        if (!queries.price) {
            queries.price = {};
        }
        queries.price.$lte = Number(query.to);
    }

    return Car.find(queries, null, {lean: Object});
}

async function getCarById(id) {
    return Car.findById(id, null, {lean: Object});
}

async function createCar(car) {
    await new Car(car).save();
}

async function deleteCar(id) {
    const car = await getCarById(id);

    if (car) {
        if (car.imageUrl !== 'no-image.jpg') {
            try {
                await fs.unlink(`./static/assets/${car.imageUrl}`);
            } catch (err) {
                console.log(err);
                throw new Error(err);
            }
        }

        await Car.findByIdAndDelete(id);
    } else {
        throw new Error('There is no such ID in the database')
    }
}

async function editCar(editedCar, id) {
    const oldRecord = await getCarById(id);

    if (editedCar.imageUrl === 'no-image.jpg') {
        if (oldRecord.imageUrl !== 'no-image.jpg') {
            editedCar.imageUrl = oldRecord.imageUrl;
        }
    } else {
        try {
            await fs.unlink(`./static/assets/${oldRecord.imageUrl}`);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    await Car.findByIdAndUpdate(id, editedCar);
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    deleteCar,
    editCar
}