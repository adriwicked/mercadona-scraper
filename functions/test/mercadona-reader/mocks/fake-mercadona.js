const firstLevelCategories = require('./firstLevelCategories.json')
const thirdLevelCategories = require('./thirdLevelCategories.json')

module.exports = {
    getFirstLevelCategories() {
        return Promise.resolve(firstLevelCategories)
    },
    getThirdLevelCategory(categoryId) {
        return Promise.resolve(thirdLevelCategories[categoryId])
    }
}