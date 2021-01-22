const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://www.imdb.com/title/tt10048342/?ref_=hm_fanfav_tt_3_pd_fp1';

(async () => {

    const response = await request(url);

    let $ = cheerio.load(response);
    let title = $('div[class="title_wrapper"] > h1').text();
    let rating = $('span[itemprop="ratingValue"]').text();

    console.log(title, rating);

})();
