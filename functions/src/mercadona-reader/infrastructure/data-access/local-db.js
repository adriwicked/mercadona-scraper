const fs = require('fs')

let savedProducts = []

const savePath = 'src/mercadona-reader/infrastructure/data-access/'

module.exports = {
    clearProducts() {
        savedProducts = []
    },    
    saveProducts(products) {
        const jsonProducts = JSON.stringify(products)
        fs.writeFileSync(savePath + 'products.json', jsonProducts)        
        return Promise.resolve(products)
    },
    getProducts() {
        const productJSON = fs.readFileSync(savePath + 'products.json')
        const products = JSON.parse(productJSON)
        return Promise.resolve(products)
    }
}