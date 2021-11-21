const fakeMercadona = require('../mocks/fake-mercadona')

describe('FakeMercadona', () => {
    it('should return first level categories', async () => {
        const response = await fakeMercadona.getFirstLevelCategories()
        expect(response.results.length).not.toBe(0)
    })
    
    it('should return third level categories by id', async () => {
        const categoryId = 101
        const response = await fakeMercadona.getThirdLevelCategory(categoryId)
        expect(response.categories.length).not.toBe(0)        
    })
})