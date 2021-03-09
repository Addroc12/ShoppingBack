const express = require('express')
const router = express.Router()
const {userById,addOrderToUserHistory} = require('../controllers/User')
const {requireSignin , isAuth, isAdmin } = require('../controllers/Auth')
const {create,listOrders,getStatusValues,updateOrderStatus,orderById} = require('../controllers/OrderC')
const {decreaseQuantity} = require('../controllers/ProductC')
var cors = require('cors')


router.post('/order/create/:userId',requireSignin, isAuth, addOrderToUserHistory,decreaseQuantity,create)
router.get('/order/list/:userId',requireSignin,isAuth,isAdmin,listOrders)
router.get('/order/status-values/:userId',requireSignin,isAuth,isAdmin,getStatusValues)
router.put('/order/:orderId/status/:userId',cors(),requireSignin,isAuth,isAdmin,updateOrderStatus)
router.param('userId' , userById)
router.param('orderId' , orderById)


module.exports = router    