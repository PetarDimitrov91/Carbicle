module.exports = {
    async get(req, res) {
        const car = await req.storage.getCarById(req.params.id);
        res.render('edit', {car, title: 'edit'});
    },
    async post(req, res) {
        const id = req.params.id;
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
                price: Number(req.body.price)
            }
            try {
                await req.storage.editCar(car, id);
                res.redirect(`/details/${id}`);
            }catch(err){
                console.log(err);
                res.redirect('/edit');
            }

        } catch (err) {
            console.log(err);
            console.log('edit error');
            process.exit(1);
        }

    }
}