import express, { Request, Response } from 'express';
import { errorHandler, successHandler } from '../handler/responseHandler'
import { loginUserValidator, registerUserValidator, updaterUserValidator } from '../validators/commonValidators'
import secureData from '../security/data'
import User from '../models/userSchema';
import * as Jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import multer from 'multer'
import { jwtAuth } from '../middleware/jwtAuth';
import nonemptyValidator from '../validators/nonEmptyValidator';
import fs from 'fs'

const router = express.Router()

// MULTER CODE FOR VIEW AND CAPTURE IMAGE //
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const fileName = new Date().getTime() + '_' + file.originalname;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

// REGISTER USER :
router.post("/register", registerUserValidator, async (request: Request, response: Response) => {
    try {
        const {
            username,
            email,
            password
        } = request.body
        const hasedPassword = await bcrypt.hash(password, 10)
        await User.create({
            username,
            email,
            password: hasedPassword
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

        const user: any = await User.findOne({ email })

        const token = await Jwt.sign({ email: user?.email }, secureData.SECRET_KEY)
        const isEqualpassword = await bcrypt.compare(password, user?.password)
        if (!isEqualpassword) throw "password miss match"
        const data = {
            message: "user login..",
            token
        }
        successHandler(response, data, 201)
    } catch (error) {
        errorHandler(response, error, 401)
    }
})

// USER PROFILE API :
router.get("/user-profile", jwtAuth, async (request: Request, response: Response) => {
    try {
        const user = await User.findOne({ email: request.query.email })

        successHandler(response, user, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
})

//  UPDATE USER PROFILE :
router.put("/update-profile", nonemptyValidator, updaterUserValidator, jwtAuth, async (request: Request, response: Response) => {
    try {
        const username = request.body.username.trim();
        const firstname = request.body.firstname.trim();
        const lastname = request.body.lastname.trim();
        const mobile = request.body.mobile.trim();
        const email = request.body.email.trim();

        await User.findByIdAndUpdate(request.query.id, {
            username,
            email,
            firstname,
            lastname,
            mobile
        })
        const data = {
            message: "user updated"
        }
        successHandler(response, data, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
})

// UPLOAD IMAGE :
router.post('/upload', upload.single('image'), async (request: Request, response: Response) => {
    try {
        const image = request.file?.filename
        const userId = request.query.id

        const user = await User.findById(userId)
        if (user?.image) {
            const image = user.image;
            console.log(image);
            fs.unlink(`public/images/${image}`, (e) => {
                if (e) {
                    console.log(e);
                } else {
                    console.log("file deleted success..");
                }
            });
        }

        await User.findByIdAndUpdate(userId,
            {
                image
            })

        successHandler(response, { message: "image uploaded" }, 200)
    } catch (error) {
        console.log(error);
        errorHandler(response, error, 401)
    }
})

// UPDATE USER PASSWORD : 
router.post("/update-password", jwtAuth, async (request: Request, response: Response) => {
    const oldpass = request.body.oldpass.trim()
    const newpass = request.body.newpass.trim()
    const confirmpass = request.body.confirmpass.trim()

    try {
        if (newpass !== confirmpass) throw "Enter right password"

        const newHasedPassword = await bcrypt.hash(newpass, 10)
        const user: any = await User.findById(request.query.id)
        const isMatchedPass = await bcrypt.compare(oldpass, user?.password)
        if (isMatchedPass) await User.findByIdAndUpdate(request.query.id, {
            password: newHasedPassword
        })
        const data = {
            message: "user password updated"
        }
        successHandler(response, data, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
})

export default router