const mongoose =  require('mongoose')
// core nodejs module to hash the password
const crypto = require ('crypto')
//using package uuid for generating unique strings
//const uuidv1 = require('uuid/dist/v1')
const { v1: uuidv1 } = require('uuid');
//Schema of user
const userSchema = new mongoose.Schema({        // schemma allows to add methods and virtual field
    name : {
        type : String ,
        trim : true ,        // any space at begning or end will be trimed out
        required : true,
        maxlength: 32

    },
    email : {
        type : String ,
        trim : true ,
        required : true,
        unique: true             // email should be unique

    },
    hashed_password : {         //virtual field: we take password from user and saved it as a virtual field 
        type : String ,
        required : true,

    },
    about : {
        type : String ,
        trim : true,

    },
    salt :String ,              //salt will be long unique string which used later to generate the hashed password
    role: {
        type : Number ,
        default : 0

    },
    history : {
        type: Array,
        default:[]

    }
      

}, {timestamps: true})  //time satmps is used to automatically create created at and updated at field for info

// virtual feild for password

userSchema.virtual('password')      // password from the client side
.set(function(password) 
{
    this._password = password       //passing password to temporary variable _password
    this.salt = uuidv1()            //this will give us a random string and use to hash the password
    this.hashed_password = this.encryptPassword(password)       //here we saving the password after encrypting to hashed_password 
})
.get(function()
{
    return this._password
})

userSchema.methods = {                      // this way we can add any methods to user schema
    
    // authenticate matches encryptPassword with hash_password
    authenticate:function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password; // === for compare adn here we return true or false
    },
    
    encryptPassword: function(password) {   // take client passwoord as input
        if(!password)return '';             // if there is no password then it return non value
        try 
        {
            return crypto.createHmac('sha1', this.salt)  //here we using crypto core nodejs module for hasing password
                                                         //createHmac is a method to hash a password and 'sh1' is a techinque to do so
                            .update(password)            // here we updating the password with hash password

                            .digest('hex')                //returned as a string twice the length containing only hexadecimal digits.
        }catch (err){
            return " ";
        }
    }
    
}

module.exports = mongoose.model("User" , userSchema)