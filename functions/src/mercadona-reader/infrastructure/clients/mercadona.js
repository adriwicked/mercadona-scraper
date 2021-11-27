const axios = require('axios')

const categoriesURL = 'https://tienda.mercadona.es/api/categories/?lang=es&wh=mad1'
const categoryURL = 'https://tienda.mercadona.es/api/categories/:categoryId/?lang=es&wh=mad1'

const getFirstLevelCategories = async () => {
    try {
        const response = await axios.get(categoriesURL)
        return response.data
    } catch (error) {
        console.error(error)
        return `${response.status} ${response.statusText}`
    }
}

const getThirdLevelCategory = async id => {    
    try {
        const response = await axios.get(categoryURL.replace(':categoryId', id))        
        return response.data
    } catch (error) {
        console.error(error)
        return `${response.status} ${response.statusText}`
    }
}

module.exports = {
    getFirstLevelCategories,
    getThirdLevelCategory
}