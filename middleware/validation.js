const validUserSchema = require('../model/joiSchema');

const registerValidation = async (req, res, next) => {
    try{
        const value  = await validUserSchema.validateAsync(req.body);
        // console.log(value);
        next();
    }catch(err){
        res.status(400).json({status: 'Failed to register user.',
    message: err.details[0].message});
    }
    
}

module.exports = registerValidation;