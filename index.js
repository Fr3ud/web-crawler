const needle = require('needle');
const mongodb = require('./mongodb/mongodb.connect');

async function main() {
    const mongoClient = await mongodb();
    const result = await needle(
        'get',
        'https://www2.hm.com/en_us/women/new-arrivals/view-all/_jcr_content/main/productlisting.display.json?sort=stock&image-size=small&image=model&offset=36&page-size=36',
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
            },
        },
    );

    // console.log(result);
    const hmDb = mongoClient.db('hm');
    const womenProducts = hmDb.collection('women-products');

    await womenProducts.insertMany(result.body.products);
}

main();
