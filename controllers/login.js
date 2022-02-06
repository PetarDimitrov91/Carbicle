module.exports = {
    get(req, res) {
        res.render('login', {title: 'Login'});
    },
    post(req, res) {
        //todo
        res.redirect('/');
    }

}