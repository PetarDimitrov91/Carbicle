module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const car = await req.storage.getCarById(id);

        if (car.owner.toString() !== req.session.user.id) {
            console.log('User is not owner');
            return res.redirect('/login');
        }

        if (car) {
            res.render('delete', {car, title: `Delete listing - ${car.name}`});
        } else {
            res.redirect('404');
        }
    },
    async post(req, res) {
        const id = req.params.id;

        try {
            if (await req.storage.deleteCar(id, req.session.user.id)) {
                res.redirect('/');
            }else{
                return res.redirect('/login');
            }
        } catch (err) {
            res.redirect('/404');
        }
    }
}