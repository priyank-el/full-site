
import validation from '../validators/middleware'
import { Response,Request } from 'express'

const registerUserValidator = (req: Request, res: Response, next: any) => {
    const registerUser = {
        username: 'required|string',
        email: 'required|isUniqueemail:User,email',
        password: 'required|string'
    }
    validation(registerUser, req, res, next)
}

const updaterUserValidator = (req: Request, res: Response, next: any) => {
    const updateUser = {
        username: 'string',
        // email: 'isUniqueemail:User,email',
        email: 'string',
        firstname:'string',
        lastname:'string',
        mobile:'string|min:10|max:10'
    }
    validation(updateUser, req, res, next)
}

const loginUserValidator = (req: Request, res: Response, next: any) => {
    const loginUser = {
        email: 'required|string',
        password: 'required|string'
    }
    validation(loginUser, req, res, next)
}

export {
    registerUserValidator,
    loginUserValidator,
    updaterUserValidator
}