const {getAll,getById} = require('./dataService');

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
    }
    next();
}