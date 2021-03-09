const User = require('../models/Userss') // appling modal user here
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const {errorHandler} = require('../helpers/dbErrorHandler')


// for SIGN UP
exports.signup = (req , res) => {
    //     // Object destructuring
    // const {username,password,email,...rest} =req.body;
    // // Error's Array
    // let errors = [];
    // // Mongoose Model.findOne()
    // User.findOne({email:email}).then(user=>{
    //     if(user){                            // for handling error 
    //         return res.status(400).json({
    //             error:'Email Already axist'
    //         })
    //     } 
    // })
    //       //console.log('rq body', req.body)

        const user = new User(req.body)         //createing  new user on bases of req body from modal

        user.save((err , user) =>{              // saving user to database
           if(err) {                            // for handling error 
               return res.status(400).json({
                   err:errorHandler(err)
               }) 
           }
           res.json({
               user
           })
       })
}

// FOR SIGN IN
exports.signin = (req , res) => 
{
    // find the user based on email
    const {email , password} = req.body
    //findOne is a method used here and we finding on the basis of email from user modal
    User.findOne({email} , (err, user) => 
    {

        if(err || !user) //if err or no user
        {
            return res.status(400).json({
                err: 'User With that email does not exist . Please signup'
            })
        }
        //if user is found make sure email and password match 
        // create authenticate method in user model
        if(!user.authenticate(password)) {
            return res.status(401).json({
                err:'Email and Password dont match'
            })
        }

        // after user is authemicated we generate a signed token with user id and secret(JWT_SECERT)
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET) //generating signe token
       
        //persist the token as 't' in cookie with expiry date
        res.cookie('t' , token, {expire: new Date() + 9999})
       
        // return response with user and token to froentend client
        const { _id, name, email, role} = user

        return res.json({token, user : {_id, email, name, role}})



    })
}

// SIGN OUT
exports.signout = (req , res) =>
{
        res.clearCookie('t')
        res.json({
            message: 'sign out success'
        })
}


//for protecting routes // its a middleware
exports.requireSignin = expressJwt
({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
    

  });


//middlware for authenticated user to give access to only to there profile 
exports.isAuth = (req , res , next ) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
        if(!user) {
            return res.status(403).json({
                error : "Access denied"

            })
        }
        next()
}


//middleware to check user is addmin or not
exports.isAdmin = (req, res, next) =>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error:'Admin resources! Access denied'
        })
    }
    next()
}