import express, { Request, Response } from 'express';
import { errorHandler, successHandler } from '../handler/responseHandler'
import { loginUserValidator, registerUserValidator, updaterUserValidator } from '../validators/commonValidators'
import secureData from '../security/data'
import User from '../models/userSchema';
import * as Jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import multer from 'multer'
import { jwtAuth } from '../middleware/jwtAuth';

const router = express.Router()


// MULTER CODE FOR VIEW AND CAPTURE IMAGE //
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/images')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + '_' + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

// REGISTER USER :
router.post("/register", registerUserValidator, async (request: Request, response: Response) => {
    try {
        const {
            username,
            email,
            password
        } = request.body
        const hasedPassword = await bcrypt.hash(password,10)
        await User.create({
            username,
            email,
            password:hasedPassword
        })
        const data = { message: "user created.." }
        successHandler(response, data, 201)
    } catch (error) {
        errorHandler(response, error, 401)
    }
})

// LOGIN USER :
router.post("/login", loginUserValidator, async (request: Request, response: Response) => {
    try {
        const {
            email,
            password
        } = request.body

        const user:any = await User.findOne({ email })
        
        const token = await Jwt.sign({ email:user?.email },secureData.SECRET_KEY)
        const isEqualpassword = await bcrypt.compare(password,user?.password)
        if(!isEqualpassword) throw "password miss match"
        const data = { 
            message: "user login.." ,
            token
        }
        successHandler(response, data, 201)
    } catch (error) {
        errorHandler(response, error, 401)
    }
})

// USER PROFILE API :
router.get("/user-profile",jwtAuth,async (request: Request, response: Response) => {
    try {
        const user = await User.findOne({ email: request.query.email })

        successHandler(response, user, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
})

//  UPDATE USER PROFILE :
router.put("/update-profile",jwtAuth,async (request: Request, response: Response) => {
    try {
        const {
            username,
            email,
            firstname,
            lastname,
            mobile
        } = request.body

        await User.findByIdAndUpdate(request.query.id,{
            username,
            email,
            firstname,
            lastname,
            mobile
        })
        const data = {
            message:"user updated"
        }
        successHandler(response,data,200)
    } catch (error) {
        errorHandler(response,error,401)
    }
})

// UPLOAD IMAGE :
router.post('/upload',upload.single("image"),(req,res)=>{
   try {
     console.log("hello");
     successHandler(res,"ok",200)
   } catch (error) {
        console.log(error);
        errorHandler(res,error,401)
   }
})

// UPDATE USER PASSWORD : 
router.post("/update-password",jwtAuth,async (request: Request, response: Response) => {
    const {oldpass,newpass} = request.body
    try {
        const user = await User.findById( request.query.id )
        if(user?.password === oldpass) await User.findByIdAndUpdate( request.query.id ,{
            password:newpass
        })
        const data = {
            message:"user password updated"
        }
        successHandler(response,data,200)
    } catch (error) {
        errorHandler(response,error,401)
    }
})

// UPLOAD IMAGE IN STORAGE 


export default router