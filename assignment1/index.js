const express = require('express');
const bodyParser = require('body-parser');
const getMetaData = require('metadata-scraper');

const app = express();
const router = express.Router()

// Middlewares used
app.use(bodyParser.json());

app.use(router.post('/scrape',(req,res) => {
    var resObj = {};

    (async () => {
        const url = req.body.url;
        const data = await getMetaData(url)

        const { title, description, image } = data;

        if (title) {
            resObj.title = title;
        }

        if (description) {
            resObj.description = description;
        }

        if (image){
            resObj.image = image;
        }

        res.send(resObj);
    })()
}))

const port = 4000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
