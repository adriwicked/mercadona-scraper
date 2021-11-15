const axios = require('axios')
const categoriesURL = 'https://tienda.mercadona.es/api/categories/?lang=es&wh=mad1'
const categoryURL = 'https://tienda.mercadona.es/api/categories/:categoryId/?lang=es&wh=mad1'

let categories = {}
let secondLevelIds = []
let products = []

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

module.exports = {
    fetchCategories,
    extractSecondLevelIds,
    fetchProducts,
    getCategories: () => categories,
    getSecondLevelIds: () => secondLevelIds,
    getProducts: () => products
}
