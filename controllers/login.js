module.exports = {
    get(req, res) {
        res.render('login', {title: 'Login'});
    },
    async post(req, res) {
        try {
            await req.auth.login(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            console.log(err.message);
            res.redirect('/login');
        }
    }

}