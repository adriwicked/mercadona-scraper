
const buildReader = require('../../../src/mercadona-reader/application/build-reader')
const mercadonaClient = require('../../../src/mercadona-reader/infrastructure/clients/mercadona')
const db = require('../../../src/mercadona-reader/infrastructure/data-access/local-db')

describe('Mercadona reader', () => {
    let reader = {}

    beforeAll(() => {
        reader = buildReader({ mercadonaClient, db })
    })

    beforeEach(() => {
        reader.clearCategoryIds()
        db.clearProducts()
    })

    it('gets all category ids', async () => {
        const categoryIds = await reader.getCategoryIds()
        expect(categoryIds.length).toBeGreaterThan(0)
    })

    it('gets all products from category ids', async () => {
        await reader.getCategoryIds()
        const products = await reader.getProducts()
        expect(products.length).toBeGreaterThan(0)
    })

    it.skip('creates product entities from products extracted', async () => {
        await reader.getCategoryIds()
        const products = await reader.getProducts()
        expect(products[0]).toHaveProperty('getId')
    })

    it('saves all the products in db', async () => {
        await reader.getCategoryIds()
        await reader.getProducts()
        await reader.saveProducts()
        const savedProducts = await db.getProducts()
        expect(savedProducts.length).toBeGreaterThan(0)
    })
})