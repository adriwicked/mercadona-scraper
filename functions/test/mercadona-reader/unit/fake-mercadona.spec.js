const fakeMercadona = require('../mocks/fake-mercadona')

describe('FakeMercadona', () => {           
    it('should return third level categories by id', async () => {        
        const response1 = await fakeMercadona.getThirdLevelCategory(115)
        expect(response1.name).toBe('Especias')
        
        const response2 = await fakeMercadona.getThirdLevelCategory(112)        
        expect(response2.name).toBe('Aceite, vinagre y sal')
    })
})