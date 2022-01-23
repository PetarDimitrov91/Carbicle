module.exports = {
    get(req, res) {
        res.render('create', {title: 'Create'});
    },
    async post(req, res) {
        try {
            let img = req.files.imageUrl;

            await img.mv('./static/assets/' + img.name);

            const car = {
                name: req.body.name,
                description: req.body.description,
                imageUrl: img.name,
                price: Number(req.body.price)
            }

            await req.storage.createCar(car);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            console.log('create error');
            process.exit(1);
        }

    }
}