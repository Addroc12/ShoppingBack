exports.userSignupValidator= (req , res , next) => {
    req.check('name' , 'Name is required').notEmpty()
    req.check('email' , 'Email must be between 3 to 32').notEmpty()
    .isLength({
        min:4,
        max:32
    }).withMessage('email must have body')
   .matches(/.+\@/)
   .withMessage('Email mmust canitain @')
   .matches(/@../)
    .withMessage('valid email')
    .matches(/\...+/)
    .withMessage('valid email 1')
    // .custom((value, {req}) => {
    //     return new Promise((resolve, reject) => {
    //       User.findOne({email:req.body.email}, function(err, user){
    //         if(err) {
    //           reject(new errors('Server Error'))
    //         }
    //         if(Boolean(user)) {
    //           reject(new errors('E-mail already in use'))
    //         }
    //         resolve(true)
    //       });
    //     });
    //   }),

    req.check('password' , 'Password is required').notEmpty()
    req.check("password")
    .isLength({min: 6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage('Password must contain a number')
    const errors = req.validationErrors()

    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    next();
}
