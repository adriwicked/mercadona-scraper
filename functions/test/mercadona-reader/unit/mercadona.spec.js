const mercadonaClient = require('../../../src/mercadona-reader/infrastructure/clients/mercadona')

describe('Mercadona client', () => {
    it('should get third level categories from API', async () => {
        const response = await mercadonaClient.getThirdLevelCategory(112)        
        expect(response.name).toBeTruthy()
    })    
})