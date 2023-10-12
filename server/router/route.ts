import express, { Request, Response } from 'express';
import { loginUserValidator, registerUserValidator, updaterUserValidator } from '../validators/commonValidators'
import multer from 'multer'
import { jwtAuth } from '../middleware/jwtAuth';
import nonemptyValidator from '../validators/nonEmptyValidator';
import { resendOtp, signInUser, signupUser, updatePassword, updateUserProfile, userProfile, verifyOtp,forgotUserPassword,createNewPassword } from '../controllers/userController';
import fs from 'fs';
import User from '../models/userSchema';
import { errorHandler, successHandler } from '../handler/responseHandler';

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
router.post("/register", registerUserValidator, signupUser)

// VERIFY OTP :
router.post("/otp-verify", verifyOtp)

// RESEND OTP :
router.post("/resend-otp",resendOtp)

// FORGOT PASSWORD :
router.post("/forgot-password",forgotUserPassword)

// UPDATE NEW PASSWORD :
router.post("/update-password",createNewPassword)

// LOGIN USER :
router.post("/login", loginUserValidator, signInUser)

// USER PROFILE API :
router.get("/user-profile", jwtAuth, userProfile)

//  UPDATE USER PROFILE :
router.put("/update-profile", nonemptyValidator, updaterUserValidator, jwtAuth, updateUserProfile)

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

// UPDATE PASSWORD :
router.post("/update-loginuser-password", jwtAuth, updatePassword)

export default router