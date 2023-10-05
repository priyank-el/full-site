import express,{ Request,Response } from 'express';
import {errorHandler,successHandler} from '../handler/responseHandler'
import {loginUserValidator,registerUserValidator} from '../validators/commonValidators'
import User from '../models/userSchema';

const router = express.Router()

router.post("/register" ,registerUserValidator,async (request:Request,response:Response)=>{
        try {
            const {
                username,
                email,
                password
            } = request.body
        
            await User.create({
                username,
                email,
                password
            })
            const data = {message:"user created.."}
            successHandler(response,data,201)
        } catch (error) {
            errorHandler(response,error,401)
        }
    })
    router.post("/login", loginUserValidator ,async (request:Request,response:Response)=>{
        try {
            const {
                email,
                password
            } = request.body
        
            const user = await User.findOne({email})
            if(user?.password !== password) throw "user password missmatch.." 
            const data = {message:"user login.."}
            successHandler(response,data,201)
        } catch (error) {
            errorHandler(response,error,401)
        }
    })
    
    router.get("/user-profile", async (request:Request,response:Response)=>{
        try {
            const user = await User.findOne({email:request.query.email})
           
            successHandler(response,user,200)
        } catch (error) {
            errorHandler(response,error,401)
        }
    })

export default router