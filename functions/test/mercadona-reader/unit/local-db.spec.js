const localDb = require('../../../src/mercadona-reader/infrastructure/data-access/local-db')

describe('Local DB', () => {
    const products = [{
        id: "4241",
        name: "Aceite de oliva 0,4º Hacendado",
        packaging: "Garrafa",
        price: "15.50",
        slug: "aceite-oliva-04o-hacendado-garrafa",
        share_url: "https://tienda.mercadona.es/product/4241/aceite-oliva-04o-hacendado-garrafa",
        thumbnail: "https://prod-mercadona.imgix.net/images/af5f40fa72d3697d7075c9549fcbc436.jpg?fit=crop&h=300&w=300"
    },
    {
        id: "4240",
        name: "Aceite de oliva 0,4º Hacendado",
        packaging: "Botella",
        price: "3.20",
        slug: "aceite-oliva-04o-hacendado-botella",
        share_url: "https://tienda.mercadona.es/product/4240/aceite-oliva-04o-hacendado-botella",
        thumbnail: "https://prod-mercadona.imgix.net/images/2c743e0d97f21942ee6bd90bfd3815c2.jpg?fit=crop&h=300&w=300"
    },
    {
        id: "4717",
        name: "Aceite de oliva virgen extra Hacendado",
        packaging: "Garrafa",
        price: "11.00",
        slug: "aceite-oliva-virgen-extra-hacendado-garrafa",
        share_url: "https://tienda.mercadona.es/product/4717/aceite-oliva-virgen-extra-hacendado-garrafa",
        thumbnail: "https://prod-mercadona.imgix.net/images/84dff1a1f7758de4eeec7379601d621a.jpg?fit=crop&h=300&w=300"
    }]        

    it('should save all the products', async () => {
        await localDb.saveProducts(products)
        const obtainedProducts = await localDb.getProducts()
        expect(obtainedProducts).toEqual(products)
    })
})