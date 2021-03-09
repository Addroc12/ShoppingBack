const mongoose =  require('mongoose')
const {ObjectId} = mongoose.Schema
//Schema of user
const productSchema = new mongoose.Schema({        // schemma allows to add methods and virtual field
    name : {
        type : String ,
        trim : true ,        // any space at begning or end will be trimed out
        required : true,
        maxlength: 32

    },
    description : {
        type : String ,

        required : true,
        maxlength: 2000

    },
    price : {
        type : Number ,
        trim:true,
        required : true,
        maxlength: 2000

    },
    category : {
        type : ObjectId ,
        ref: 'Category',
        required:true

    },
    quantity :{
        type:Number
    },
    sold : {
        type :Number,
        default : 0 
    },
    photo : {
        data : Buffer,
        contentType: String
    },
    shipping:{
        required : false,
        type: Boolean
    }
    

}, {timestamps: true})  //time satmps is used to automatically create created at and updated at field for info


module.exports = mongoose.model("Product" ,productSchema)