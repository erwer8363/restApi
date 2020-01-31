const jwt = require('koa-jwt')
const {secret} = require('../config')
const Router = require('koa-router')
const router = new Router({prefix:'/questions/:questionId/answers'})

const {
    find,
    findById,
    create,
    update,
    delete:del,
    checkAnswerExist,
    checkAnswerer
} = require('../controllers/answers')

const auth = jwt({secret})

router.get('/',find)
router.post('/',auth,create)
router.get('/:id',checkAnswerExist,findById)
router.patch('/:id',checkAnswerExist,checkAnswerer,update)
router.delete('/:id',checkAnswerExist,checkAnswerer,del)
module.exports = router