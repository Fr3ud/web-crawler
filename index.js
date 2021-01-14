const needle = require('needle');

async function main() {
    const result = await needle('https://www2.hm.com/en_us/women/new-arrivals/view-all/_jcr_content/main/productlisting.display.json?sort=stock&image-size=small&image=model&offset=36&page-size=36');

    console.log(result);
}

main();
