
const reader = require('../../src/reader')

describe('Mercadona reader', () => {        
    beforeAll(async () => {                
        await reader.fetchCategories()
    })

    it('gets first and second level categories', async () => {
        const categories = reader.getCategories()
        expect(categories.count).toBe(categories.results.length)
    })

    it('extracts all second level category ids', () => {
        reader.extractSecondLevelIds()
        const secondLevelIds = reader.getSecondLevelIds()
        expect(secondLevelIds.length).not.toBe(0)
    })

    // it('gets all products', async () => {
    //     await reader.fetchProducts()
    //     const products = reader.getProducts()
    //     expect(products.length).not.toBe(0)
    // })
})