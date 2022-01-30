const {Schema, model} = require('mongoose');

const carSchema = new Schema({
    name: {
        type: String,
        validate: function(){
            return this.name.length >= 2;
        }
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