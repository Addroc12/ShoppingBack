const express = require('express')
const App = express()
const mongoose = require('mongoose');
const morgan = require('morgan')        //by we use of morgan we can able to see any routes which is requested on console
const bodyParser = require('body-parser') //we need body-parser bcuz we sending data from client side as a request body and for grabbing that rqst body we use body-parser
const cookieParser = require('cookie-parser')// we able what is inside the body of cookie
const expressValidator = require('express-validator')// for validating user data and for giving freindly error message to user
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config()

//middle ware 
App.use(cors()) //this is used to handle req from diff origins like from local host 8000 and locat host 3001
App.use(morgan('dev'))
App.use(bodyParser.json())
App.use(cookieParser())
App.use(expressValidator())


//import routes from files
const authRoutes = require('./routes/AuthR')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/CategoryR')
const productRoutes = require('./routes/ProductR')
const braintreeRoutes = require('./routes/Braintree')
const orderRoutes = require('./routes/Order')



//DB Connections
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true ,useUnifiedTopology:true ,  useCreateIndex: true})
.then(()=> console.log('DB Connected'))
mongoose.connection.on('error' , err => {
    console.log(`DB connection error: ${err.message}`)
})



// routes middleware for browser
App.use('/api' ,authRoutes)
App.use('/api' ,userRoutes)
App.use('/api' ,categoryRoutes)
App.use('/api' ,productRoutes)
App.use('/api' ,braintreeRoutes)
App.use('/api' ,orderRoutes)


const port = process.env.PORT || 8000

App.listen(port , ( )=> {
    console.log(`we are ready to go on ${port}`)
})  

  