import * as Jwt from 'jsonwebtoken'
import data from '../security/data'
import User from '../models/userSchema'
import { Request, Response } from 'express'

const jwtAuth = async (req:Request,res:Response,next:any) => {
    try {
        const authToken:any = req.headers.authorization;
        const decodedToken:any = await Jwt.verify( authToken,data.SECRET_KEY )
        
        const user = await User.findOne({email:decodedToken.email})
    
        if(!user) throw "user not found"
        req.app.locals.user = user
        next()
    } catch (error) {
        next()
    }
}

export {jwtAuth}