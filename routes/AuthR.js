const express = require('express')
const router = express.Router()
const {signup , signin , signout , requireSignin} = require('../controllers/Auth')
const {userSignupValidator} = require('../validators/index')


// router.get('/', (req , res) =>{
//     res.send('Hello from node')
// })

router.post('/signup', userSignupValidator ,  signup) //here  first we go to userSignupValidator then signup
router.post('/signin',   signin)
router.get('/signout',   signout) 
    //sad

router.get('/hello', requireSignin ,(req , res) => {
    res.send('hello')
}) 
module.exports = router
