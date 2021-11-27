let savedProducts = []

module.exports = {
    clearProducts() {
        savedProducts = []
    },    
    saveProducts(products) {
        savedProducts = savedProducts.concat(products)
        return Promise.resolve(products)
    },
    getProducts() {
        return Promise.resolve(savedProducts)
    }
}