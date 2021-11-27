const axios = require('axios')

const categoriesURL = 'https://tienda.mercadona.es/api/categories/?lang=es&wh=mad1'


printCategoryIds()

async function printCategoryIds() {
    const categoryIds = await getCategoryIds()
    console.log(categoryIds)    
}

async function getCategoryIds() {
    try {
        const response = await axios.get(categoriesURL)
        return response.data.results.reduce((ids, category) => {
            const newIds = category.categories.map(c => c.id)
            return ids.concat(newIds)
        }, [])
    } catch (error) {
        return error
    }
}