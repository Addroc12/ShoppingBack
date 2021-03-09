const express = require('express')
const router = express.Router()
const {create , categoryById , read, update, remove, list} = require('../controllers/CategoryC')
const {requireSignin , isAuth , isAdmin} = require('../controllers/Auth')
const {userById} = require('../controllers/User')



router.get('/category/:categoryId', read)
router.post('/category/create/:userId',requireSignin , isAuth , isAdmin ,  create)
router.put('/category/update/:categoryId/:userId',requireSignin , isAuth , isAdmin ,  update)
router.delete('/category/remove/:categoryId/:userId',requireSignin , isAuth , isAdmin ,  remove)
router.get('/categories', list)
router.param('categoryId' , categoryById)  
router.param('userId' , userById)  


module.exports = router