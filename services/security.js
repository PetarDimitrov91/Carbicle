const bcrypt = require('bcrypt');

module.exports = {
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    },
    async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    },
    isLoggedIn() {
        return function (req, res, next) {
            if (req.session.user) {
                next();
            } else {
                res.redirect('/login');
            }
        };
    }
}