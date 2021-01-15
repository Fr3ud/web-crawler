const needle = require('needle');
const mongodb = require('./mongodb/mongodb.connect');

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    },
};

async function main() {
    const mongoClient = await mongodb();
    const hmDb = mongoClient.db('hm');
    const womenProducts = hmDb.collection('women-products');

    const pageSize = 96;
    let totalProducts = 1000;

    for (let offset = 0; offset < totalProducts; offset += pageSize) {
        const result = await needle(
            'get',
            `https://www2.hm.com/en_us/women/new-arrivals/view-all/_jcr_content/main/productlisting.display.json?sort=stock&image-size=small&image=model&offset=${offset}&page-size=${pageSize}`,
            options,
        );

        totalProducts = result.body.total;
        await womenProducts.insertMany(result.body.products);

        console.log(`Offset: ${offset}`);
        console.log(`TotalProducts: ${totalProducts}`);

        await sleep(getRandomInt(5) * 1000);
    }
    // console.log(result);
}

main();
