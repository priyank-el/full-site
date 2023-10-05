
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

const loginUserValidator = (req: Request, res: Response, next: any) => {
    const loginUser = {
        email: 'required|string',
        password: 'required|string'
    }
    validation(loginUser, req, res, next)
}

export {
    registerUserValidator,
    loginUserValidator
}