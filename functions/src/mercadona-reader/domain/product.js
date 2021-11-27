module.exports = function createProduct({
    id,
    name,
    packaging,
    price,
    share_url,
    thumbnail
} = {}) {
    if (!id) { throw new Error('Product must have an id') }
    if (!name) { throw new Error('Product must have a name') }    
    if (!price) { throw new Error('Product must have a price') }
    if (!isValidURL(share_url)) { throw new Error('Product must have a valid share_url') }
    if (!isValidURL(thumbnail)) { throw new Error('Product must have a valid thumbnail') }    

    return Object.freeze({
        getId: () => id,
        getName: () => name,
        getPackaging: () => packaging,
        getPrice: () => price,
        getShare_url: () => share_url,
        getThumbnail: () => thumbnail
    })

    function isValidURL(url) {
        const regExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        return regExp.test(url)
    }
}