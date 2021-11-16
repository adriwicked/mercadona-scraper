const faker = require('faker')

module.exports = function createFakeProduct(overrides) {
    const product = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        packaging: faker.commerce.productAdjective(),
        price: faker.commerce.price(),
        share_url: faker.internet.url(),
        thumbnail: faker.image.imageUrl()
    }

    return {
        ...product,
        ...overrides
    }
}
