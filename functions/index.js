const functions = require("firebase-functions");
const axios = require('axios')

const baseURL = 'https://tienda.mercadona.es/api/categories/?lang=es&wh=mad1'

exports.saveMercadonaProducts = functions.https.onRequest(async (request, response) => {
    const mercResp = await axios.get(baseURL)

    const categories = {
        count: mercResp.count
    }
    functions.logger.info("The count of Mercadona categories: ", categories);
    response.send(`The count of Mercadona categories: ${categories}`);
});
