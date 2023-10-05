import express, { Request, Response } from 'express';
import { errorHandler, successHandler } from '../handler/responseHandler'
import { loginUserValidator, registerUserValidator, updaterUserValidator } from '../validators/commonValidators'
import secureData from '../security/data'
import User from '../models/userSchema';
import * as Jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/register", registerUserValidator, async (request: Request, response: Response) => {
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
        const data = { message: "user created.." }
        successHandler(response, data, 201)
    } catch (error) {
        errorHandler(response, error, 401)
    }
})

router.post("/login", loginUserValidator, async (request: Request, response: Response) => {
    try {
        const {
            email,
            password
        } = request.body

        const user = await User.findOne({ email })
        if (user?.password !== password) throw "user password missmatch.."
        const token = await Jwt.sign({ email:user?.email },secureData.SECRET_KEY)
        const data = { 
            message: "user login.." ,
            token
        }
        successHandler(response, data, 201)
    } catch (error) {
        errorHandler(response, error, 401)
    }
})

router.get("/user-profile", async (request: Request, response: Response) => {
    try {
        const user = await User.findOne({ email: request.query.email })

        successHandler(response, user, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
})


//  UPDATE USER PROFILE :
router.put("/update-profile",updaterUserValidator, async (request: Request, response: Response) => {
    try {
        await User.findByIdAndUpdate(request.query.id,{
            username: request.body.username ,
            email:request.body.email,
            password:request.body.password
        })
        const data = {
            message:"user updated"
        }
        successHandler(response,data,200)
    } catch (error) {
        errorHandler(response,error,401)
    }
})

export default router