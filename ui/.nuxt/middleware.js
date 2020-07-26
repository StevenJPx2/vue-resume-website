const middleware = {}

middleware['nav'] = require('../middleware/nav.js')
middleware['nav'] = middleware['nav'].default || middleware['nav']

export default middleware
