const mongoose = require('mongoose');

require('./Car');

const connectionString = 'mongodb://localhost:27017/carbicle';

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }, (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });

        console.log('Database connected!');
    } catch (err) {
        console.log('Database connection error occurred while attempting to connect!');
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = init;