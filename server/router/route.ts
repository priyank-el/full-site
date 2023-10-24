import express, { Request, Response } from 'express';
import { loginUserValidator, registerUserValidator, updaterUserValidator } from '../validators/commonValidators'
import multer from 'multer'
import { jwtAuth } from '../middleware/jwtAuth';
import nonemptyValidator from '../validators/nonEmptyValidator';
import { addState,getAllStates,addCity,getAllCities,resendOtp,updateProduct,deleteProduct,AllProducts,addProductData, getAllProducts,signInUser, productById,signupUser, updatePassword, updateUserProfile, userProfile, verifyOtp,forgotUserPassword,createNewPassword,addCountry,getAllCountry } from '../controllers/userController';
import fs from 'fs';
import User from '../models/userSchema';
import { errorHandler, successHandler } from '../handler/responseHandler';
import { addProductValidator } from '../validators/allCustomChecker';

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

// UPLOAD USER IMAGE :
router.post('/upload', upload.single('image'), async (request: Request, response: Response) => {
    try {
        const image = request.file?.filename
        const userId = request.query.id

        const user = await User.findById(userId)
        if (user?.image) {
            const image = user.image;
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

// CREATE PRODUCT :
router.post('/add-product',upload.single('image'),addProductValidator,addProductData)

// GET PRODUCT BY ID :
router.get("/product-data",productById)

// Update product :
router.put('/update-product',upload.single('image'),updateProduct)

//  DELETE PRODUCT :
router.delete('/delete-product',deleteProduct)

// GET ALL PRODUCTS BY USER ID:
router.get('/all-products',jwtAuth,getAllProducts)

// GET ALL USERS PRODUCTS :
router.get('/products',jwtAuth,AllProducts)

// UPDATE PASSWORD :
router.post("/update-loginuser-password", jwtAuth, updatePassword)

// API FOR ADD : 
router.post('/add-country',addCountry)
router.post('/add-state',addState)
router.post('/add-city',addCity)

// API FOR VIEW ALL LIST :
router.get('/all-countries',getAllCountry)
router.get('/all-states',getAllStates)
router.get('/all-cities',getAllCities)

export default router