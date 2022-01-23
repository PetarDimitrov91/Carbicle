module.exports = {
    async home(req, res) {
        const cars = await req.storage.getAllCars();
        res.render('index', {cars, title: 'Carbicle'});
    }
}