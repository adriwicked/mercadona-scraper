const createProduct = require('../domain/product')

module.exports = function buildReader({ mercadonaClient, db }) {
    let categoryIds = []
    let products = []    

    function extractProducts(secondLevelCategory) {
        return secondLevelCategory.categories.reduce((products, cat) => {
            const newProducts = cat.products.map(p => ({
                id: p.id,
                name: p.display_name,
                packaging: p.packaging,
                price: p.price_instructions.unit_price,
                slug: p.slug,
                share_url: p.share_url,
                thumbnail: p.thumbnail,
            }))
            return products.concat(newProducts)
        }, [])
    }

    return {
        clearCategoryIds() {
            categoryIds = []
        },
        async getCategoryIds() {
            const response = await mercadonaClient.getFirstLevelCategories()
            categoryIds = response.results.reduce((ids, category) => {
                const newIds = category.categories
                    .map(c => c.id)
                    .filter(id => typeof id === 'number')
                return ids.concat(newIds)
            }, [])

            return categoryIds
        },        
        async getProducts() {
            const responses = await Promise.all(
                categoryIds.map(mercadonaClient.getThirdLevelCategory)
            )

            products = responses.reduce((products, response) => {
                const newProducts = extractProducts(response)                
                return products.concat(newProducts)
            }, [])
            
            // products = products.map(createProduct)

            return products
        },
        async saveProducts() {
            await db.saveProducts(products)
        }
    }
}