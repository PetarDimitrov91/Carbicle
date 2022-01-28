const {getAll,getById} = require('./data_service');

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
    }
    next();
}