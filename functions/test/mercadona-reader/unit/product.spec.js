const createFakeProduct = require('../mocks/fake-product')
const createProduct = require('../../../src/mercadona-reader/domain/product')

describe('Product', () => {
    it('must have an id', () => {
        const productInfo = createFakeProduct({ id: null })
        expect(() => createProduct(productInfo))
            .toThrow('Product must have an id')
    })

    it('must have a name', () => {
        const productInfo = createFakeProduct({ name: null })
        expect(() => createProduct(productInfo))
            .toThrow('Product must have a name')
    })

    it('must have a packaging', () => {
        const productInfo = createFakeProduct({ packaging: null })
        expect(() => createProduct(productInfo))
            .toThrow('Product must have a packaging')
    })

    it('must have a price', () => {
        const productInfo = createFakeProduct({ price: null })
        expect(() => createProduct(productInfo))
            .toThrow('Product must have a price')
    })

    it('must have a valid share_url', () => {
        const productInfo = createFakeProduct({ share_url: null })
        expect(() => createProduct(productInfo))
            .toThrow('Product must have a valid share_url')
    })

    it('must have a valid thumbnail', () => {
        const productInfo = createFakeProduct({ thumbnail: null })
        expect(() => createProduct(productInfo))
            .toThrow('Product must have a valid thumbnail')
    })    
})