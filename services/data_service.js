const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/carbicle';

mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

const carSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    price: Number
});

const Car = mongoose.model('Car', carSchema)

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

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll
    }
    next();
}