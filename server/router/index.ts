import express,{Request,Response} from "express";
import User from "../models/userSchema";
import { errorHandler, successHandler } from "../handler/responseHandler";

const router = express.Router() 

router.post("/register", async (request:Request,response:Response)=>{
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
router.post("/login", async (request:Request,response:Response)=>{
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

router.get("/all-users", async (request:Request,response:Response)=>{
    try {
        const users = await User.find()
       
        successHandler(response,users,200)
    } catch (error) {
        errorHandler(response,error,401)
    }
})

export default router