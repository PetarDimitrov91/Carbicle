const {Schema, model} = require('mongoose');

const carSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String,
        validate: function () {
            return this.description.length >= 10;
        }
    },
    imageUrl: {
        type: String
    },
    price: {
        type: Number,
    }
});

const Car = model('Car', carSchema);

module.exports = Car;