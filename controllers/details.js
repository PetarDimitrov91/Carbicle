module.exports = {
    async details(req, res) {
        const car = await req.storage.getCarById(req.params.id);
        if (car) {
            res.render('detail', {car, title: 'Details'});
        } else {
            res.redirect('/404');
        }
    }
}