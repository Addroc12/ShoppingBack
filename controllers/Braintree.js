const User = require('../models/Userss')
const braintree= require('braintree')
require('dotenv').config()


const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    merchantId: process.env.BRAINTREE_MERCHANT_ID

})


exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response)
    {
        
        if(err)
        {
            res.status(500).send(err)
        }else{
            res.send(response)
        }
    })

}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    // charge
    let newTransaction = gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (error, result) => {
        if(error){
            res.status(500).json(error)
        }else{
            res.json(result)
        }
    }
    )
} 