const firstLevelCategories = require('./firstLevelCategories.json')
const thirdLevelCategories = require('./thirdLevelCategories.json')

module.exports = {
    getFirstLevelCategories() {
        return firstLevelCategories
    },
    getThirdLevelCategory(categoryId) {
        return thirdLevelCategories[categoryId]
    }
}