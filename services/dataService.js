const Car = require('./models/Car');
const fs = require('fs/promises');

async function getAllCars(query) {
    const queries = {};

    let {search, from, to, page, size} = query;

    if (search) {
        queries.name = new RegExp(query.search, 'i');
    }

    if (from) {
        queries.price = {$gte: Number(query.from)}
    }

    if (to) {
        if (!queries.price) {
            queries.price = {};
        }

        queries.price.$lte = Number(query.to);
    }

    if (!page) {
        page = 1
    }

    if (!size) {
        size = 6;
    }

    const skip = (Number(page) - 1) * size;
    const docsCount = search || from || to ? await Car.find(queries).count() : await Car.collection.countDocuments();
    const pagesCount = Math.ceil(docsCount / size);

    const cars = await Car.find(queries).lean()
        .limit(size)
        .skip(skip);

    return {
        cars,
        pagesCount,
        size
    };
}

async function getCarById(id) {
    const car = await Car.findById(id, null, {lean: Object});
    return car;
}

async function createCar(car) {
    await new Car(car).save();
}

async function deleteCar(id, ownerId) {
    const car = await getCarById(id);

    if (car) {
        if (car.owner.toString() !== ownerId) {
            return false;
        }

        if (car.imageUrl !== 'no-image.jpg') {
            try {
                await fs.unlink(`./static/assets/${car.imageUrl}`);
            } catch (err) {
                console.log(err);
                throw new Error(err);
            }
        }

        await Car.findByIdAndDelete(id);

        return true;
    } else {
        throw new Error('There is no such ID in the database')
    }
}

async function editCar(editedCar, id, ownerId) {
    const oldRecord = await getCarById(id);

    if (oldRecord.owner.toString() !== ownerId) {
        return false;
    }

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
    return true;
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    deleteCar,
    editCar
}