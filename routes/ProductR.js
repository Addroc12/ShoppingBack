const express = require('express')
const router = express.Router()
const {create ,productById , read , remove , update, lists, listRelated, listCategories, listBySearch, photo, listSearch} = require('../controllers/ProductC')
const {userById} = require('../controllers/User')
const {requireSignin , isAuth , isAdmin} = require('../controllers/Auth')




//CRUD:- Create Read Update and Delete operations
router.get('/product/:productId' , read)
router.delete('/product/:productId/:userId' , requireSignin , isAuth , isAdmin , remove)
router.put('/product/update/:productId/:userId' , requireSignin , isAuth , isAdmin , update)
router.post('/product/create/:userId', requireSignin , isAuth , isAdmin ,  create)

router.get("/products" , lists)
router.get("/products/search", listSearch);

router.get('/product/related/:productId', listRelated)
//return categories based on products
router.get('/products/categories' , listCategories)

// route - make sure its post bcuz we sending the filters on which products are shown
router.post("/products/by/search", listBySearch);

router.get('/products/photo/:productId' , photo)

router.param('userId' , userById)
router.param('productId' , productById)    

module.exports = router