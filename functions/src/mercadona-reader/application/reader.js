const axios = require('axios')
const Firestore = require('@google-cloud/firestore');


const categoriesURL = 'https://tienda.mercadona.es/api/categories/?lang=es&wh=mad1'
const categoryURL = 'https://tienda.mercadona.es/api/categories/:categoryId/?lang=es&wh=mad1'

let categories = {}
let secondLevelIds = []
let products = []

const db = new Firestore({
  projectId: 'mercadona-scraper',
  keyFilename: '../keys/mercadona-scraper-7d9ab92ec97c.json',
});

const fetchCategories = async () => {
    const response = await axios.get(categoriesURL)
    categories = response.data
}

const fetchProducts = async () => {
    const responses = await Promise.all(
        secondLevelIds.map(id => {
            const url = categoryURL.replace(':categoryId', id)
            return axios.get(url)
        })
    )

    products = responses.reduce((products, response) => {
        const newProducts = response.data.categories
            .reduce((catProds, cat) => {
                const newCatProds = cat.products.map(p => ({
                    id: p.id,
                    name: p.display_name,
                    packaging: p.packaging,
                    price: p.price_instructions.unit_price,
                    slug: p.slug,
                    share_url: p.share_url,
                    thumbnail: p.thumbnail,
                }))
                return catProds.concat(newCatProds)
            }, [])
        return products.concat(newProducts)
    }, [])

    const chunks = chunkArray(products, 500)

    chunks.forEach(chunk => {
        const batch = db.batch()
        chunk.forEach(product => {
            const docRef = db.collection('products').doc(product.id)
            batch.set(docRef, product, { merge: true })
        })
        batch.commit()
    })
}

const extractSecondLevelIds = () => {
    secondLevelIds = categories.results
        .reduce((ids, firstLevel) => {
            const newIds = firstLevel.categories
                .map(c => c.id)
                .filter(id => typeof id === 'number')
            return ids.concat(newIds)
        }, [])
}

const chunkArray = (myArray, chunk_size) => {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);        
        tempArray.push(myChunk);
    }

    return tempArray;
}

module.exports = {
    fetchCategories,
    extractSecondLevelIds,
    fetchProducts,
    getCategories: () => categories,
    getSecondLevelIds: () => secondLevelIds,
    getProducts: () => products
}
