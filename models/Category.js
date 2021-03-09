const mongoose =  require('mongoose')

//Schema of Category
const categorySchema = new mongoose.Schema({        //schema defines model of ur collection (database) and schemma allows to add methods and virtual field
    name : {
        type : String ,
        trim : true ,        // any space at begning or end will be trimed out
        required : true,
        maxlength: 32,
        unique: true

    },
   
      

}, {timestamps: true})

module.exports = mongoose.model('Category', categorySchema)