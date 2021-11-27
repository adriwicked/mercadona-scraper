
const buildReader = require('../../../src/mercadona-reader/application/build-reader')
const mercadonaClient = require('../mocks/fake-mercadona')
const db = require('../../../src/mercadona-reader/infrastructure/data-access/local-db')

describe('Mercadona reader', () => {
    let reader = {}

    beforeAll(() => {
        reader = buildReader({ mercadonaClient, db })
    })

    beforeEach(() => {
        db.clearProducts()
    })

    it('gets all category ids', async () => {
        await reader.extractProducts()
        const categoryIds = reader.getCategoryIds()
        expect(categoryIds).toHaveLength(5)
    })

    it('gets all mercadona products and save them', async () => {
        await reader.extractProducts()
        const products = await db.getProducts()
        expect(products.length).not.toBe(0)
    })
})