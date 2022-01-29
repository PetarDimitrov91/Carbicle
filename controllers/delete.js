module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const car = await req.storage.getCarById(id);

        if (car) {
            res.render('delete', {car, title: 'Delete'});
        } else {
            res.redirect('404');
        }
    },
    async post(req, res) {
        const id = req.params.id;

        try {
            await req.storage.deleteCar(id)
            res.redirect('/');
        } catch (err) {
            res.redirect('/404');
        }
    }
}