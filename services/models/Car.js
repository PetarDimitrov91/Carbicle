const {Schema, model, Types: {ObjectId}} = require('mongoose');

const carSchema = new Schema({
    name: {
        type: String,
        validate: function () {
            return this.name.length >= 2;
        }
    },
    description: {
        type: String,
        validate: function () {
            return this.description.length >= 10;
        }
    },
    imageUrl: {type: String},
    price: {type: Number,},
    owner: {type: ObjectId, ref: 'User'}
});

const Car = model('Car', carSchema);

module.exports = Car;