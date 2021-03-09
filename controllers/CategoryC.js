const Category = require('../models/Category')
const {errorHandler} = require('../helpers/dbErrorHandler')

//Creating Category 
exports.create = (req , res) => {
    const category = new Category(req.body)

      
        // 1kb = 1000
        // 1mb = 1000000
      
        category.save ((err, data) => {
            if(err){
                return res.status(400).json ({
                    error: errorHandler
                })
            }
            res.json({data})
        })  
    
}




//get a single category by id
exports.categoryById = (req , res , next , id) => {

    Category.findById(id).exec((err , category) => {
        if(err || !category){
            return res.status(400).json({
                error : "category is not made"
            })
        }
        req.category = category
        next()
    })
}

//Performing Crud operations on categories
//Read
exports.read = (req , res) => {
    return res.json(req.category)
}

//Update
exports.update = (req , res) =>{
    const category = req.category
    category.name=req.body.name

    category.save ((err, data) => {             // save method 
        if(err){
            return res.status(400).json ({
                error: errorHandler(err)
            })
        }
        res.json({data})
    })

}

//Delete
exports.remove = (req , res) =>{
    const category = req.category

    category.remove ((err, data) => {       //here we move remove method
        if(err){
            return res.status(400).json ({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Category deleted"
        })
    })

}

//list
exports.list = (req , res) => {
        Category.find().exec((err , data) => {
            if(err){
                res.status(400).json({
                    error : errorHandler(err)
                })
            }
            return res.json(data)
        })
}
