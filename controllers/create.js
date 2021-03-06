module.exports = {
    get(req, res) {
        res.render('create', {title: 'Create'});
    },
    async post(req, res) {
        try {
            let img;

            if (req.files) {
                img = req.files.imageUrl;
                await img.mv('./static/assets/' + img.name);
            }

            const car = {
                name: req.body.name,
                description: req.body.description,
                imageUrl: img ? img.name : 'no-image.jpg',
                price: Number(req.body.price),
                owner: req.session.user.id
            }

            try {
                await req.storage.createCar(car);
                res.redirect('/');
            } catch (err) {
                console.log(err);
                res.redirect('/create');
            }

        } catch (err) {
            console.log(err);
            console.log('create error');
            process.exit(1);
        }

    }
}