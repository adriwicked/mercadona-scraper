const fs = require('fs');


module.exports = {
    getFirstLevelCategories() {
        return JSON.parse(            
            fs.readFileSync('test/mercadona-reader/mocks/categories.json')
        )
    },
    getThirdLevelCategory(categoryId) {
        return JSON.parse(
            fs.readFileSync('test/mercadona-reader/mocks/thirdLevelCategories.json')
        )
    }
}