module.exports = function buildReader({ mercadonaClient, db }) {
    const categoryIds = []

    return {
        async extractProducts() {
            const response = await mercadonaClient.getCategoryIds()
            const products = await mercadonaClient.getThirdLevelCategory()
            await db.saveProducts(products)
        },
        getProducts() {
            return Promise.resolve(foodCategories)
        },
        getCategoryIds() {
            return [1,2,3,4,5]
        }
    }
}