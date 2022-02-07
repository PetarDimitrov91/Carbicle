module.exports = {
    get(req, res) {
        res.render('register', {title: 'Register'});
    },
    async post(req, res) {
        if (req.body.username === '' ||
            req.body.password === '' ||
            req.body.password.length < 6 ||
            req.body.password !== req.body.rePassword) {

            return res.redirect('/register');
        }

        try {
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.redirect('/register');
        }
    }
}