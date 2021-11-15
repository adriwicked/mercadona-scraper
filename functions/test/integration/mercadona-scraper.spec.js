
const scraper = require('../../src/scraper')

describe('Mercadona scraper', () => {        
    beforeAll(async () => {                
        await scraper.fetchCategories()
    })

    it('gets first and second level categories', async () => {
        const categories = scraper.getCategories()
        expect(categories.count).toBe(categories.results.length)
    })

    it('extracts all second level category ids', () => {
        scraper.extractSecondLevelIds()
        const secondLevelIds = scraper.getSecondLevelIds()
        expect(secondLevelIds.length).not.toBe(0)
    })

    it('gets all products', async () => {
        await scraper.fetchProducts()
        const products = scraper.getProducts()
        expect(products.length).not.toBe(0)
    })
})