// ES6
import Validator from 'validatorjs';
import { Response,Request } from 'express'
import mongoose from 'mongoose';

Validator.registerAsync('isUniqueemail', async function (username, attribute, req, passes) {

    const array = attribute.split(',')
    const { 0: model, 1: field } = array
  
    const isUser = await mongoose.model(model).findOne({ [field]: username })
  
    if (!isUser) {
      return passes()
    }
    await passes(false, "email already exist..")
  }, '')

// main function for do validation
const validaeWithCallback = (rules: any, req: Request, res: Response, next: any) => {
    const validation = new Validator(req.body, rules);
    validation.passes(() => next());
    validation.fails(() => {
        sendError(req, res, formattedErrors(validation.errors.errors))
    }
    );
}

//** function for error handling */ 
function sendError(req: Request, res: Response, data: any, statusCode = 422) {
    return res.status(statusCode).json(data)
}

function formattedErrors(err: any) {
    let transformed: any = {};
    Object.keys(err).forEach(function (key) {
        console.log(key);
        transformed[key] = err[key][0];
    })
    return transformed
}

 export default validaeWithCallback