module.exports = {
    async home(req, res) {
        const {cars, pagesCount, size} = await req.storage.getAllCars(req.query);
        let urlTemplate = '/?';

        if (req.query.search) {
            urlTemplate += `search=${req.query.search}&`;
        }

        if (req.query.from) {
            urlTemplate += `&from=${req.query.from}&`;
        }

        if (req.query.to) {
            urlTemplate += `to=${req.query.to}&`;
        }

        let pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            let tmp = urlTemplate;

            pages[i] = {
                urlTemplate: tmp += `page=${i}&size=${size}`,
                tmp: i
            };
        }

        res.render('index', {cars, pages, title: 'Carbicle', query: req.query});
    }
}