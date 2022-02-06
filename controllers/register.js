module.exports = {
    get(req, res) {
        res.render('register', {title: 'Register'});
    },
    post(req, res) {
        //todo
        res.redirect('/');
    }
}