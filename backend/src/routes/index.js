const router = require('express').Router()
const likesRouter = require('./likes/likeRouter')

router.use('/likes', likesRouter)

module.exports = router