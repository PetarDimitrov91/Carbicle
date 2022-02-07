module.exports = {
    async details(req, res) {
        const car = await req.storage.getCarById(req.params.id);

        if (req.session.user && req.session.user.id === car.owner.toString()) {
            car.isOwner = true;
        }

        if (car) {
            res.render('detail', {car, title: `Carbicle - ${car.name}`});
        } else {
            res.redirect('/404');
        }
    }
}