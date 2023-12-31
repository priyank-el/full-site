import { Request, Response } from 'express'
import fs from 'fs'
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';

import { successHandler, errorHandler } from "../handler/responseHandler";
import secureData from '../security/data'
import User from "../models/userSchema";
import * as bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
import Country from '../models/countrySchema';
import State from '../models/stateSchema';
import City from '../models/citySchema';
import Product from '../models/productSchema';
import mongoose from 'mongoose';
import path from 'path'

const
    ffmpegPath = require('@ffmpeg-installer/ffmpeg').path,
    ffprobePath = require('@ffprobe-installer/ffprobe').path,
    ffmpeg = require('fluent-ffmpeg')


ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);

const signupUser = async (request: Request, response: Response) => {
    const {
        username,
        email,
        password
    } = request.body

    const otp: string = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
    });
    try {
        const check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const isEmail = check.test(email)
        if (!isEmail) throw "Email is not valid"

        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<< SENDING MAIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: secureData.ADMIN_EMAIL,
                pass: secureData.ADMIN_PASS,
            },
        });

        try {
            await transporter.sendMail({
                from: secureData.ADMIN_EMAIL, // sender address
                to: email, // list of receivers
                subject: "otp Verification ✔", // Subject line
                text: `Your otp is ${otp} `, // plain text body
            });
        } catch (error) {
            console.log(error);
            throw "mail not send because of invalid credentials.."
        }


        const hasedPassword = await bcrypt.hash(password, 10)
        await User.create({
            username,
            email,
            password: hasedPassword,
            otp
        })

        const data = { message: "user created.." }
        successHandler(response, data, 201)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const verifyOtp = async (request: Request, response: Response) => {
    try {
        const otp = request.body.otp;
        const email = request.body.email;

        const user = await User.findOne({ email })

        if (user?.otp !== otp) throw 'otp not matched..';

        await User.findOneAndUpdate({ email }, {
            otpVerification: true
        })
        const message = { message: "otp verified" }
        successHandler(response, message, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const resendOtp = async (request: Request, response: Response) => {
    try {
        const email = request.body.email;

        const user = await User.findOne({ email })
        if (!user) throw "user not fond"
        const otp: string = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<< SENDING MAIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: secureData.ADMIN_EMAIL,
                pass: secureData.ADMIN_PASS,
            },
        });

        try {
            await transporter.sendMail({
                from: secureData.ADMIN_EMAIL, // sender address
                to: email, // list of receivers
                subject: "otp Verification ✔", // Subject line
                text: `Your otp is ${otp} `, // plain text body
            });
        } catch (error) {
            console.log(error);
            throw "mail not send because of invalid credentials.."
        }

        await User.findOneAndUpdate({ email }, {
            otp
        })

        const message = { message: "otp sended" }
        successHandler(response, message, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const forgotUserPassword = async (request: Request, response: Response) => {
    try {
        const { email, type, otp } = request.body

        const user = await User.findOne({ email })
        if (!user) throw "This email is not valid go for sign up"

        const genrated_otp: string = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        if (type == 1) {
            // <<<<<<<<<<<<<<<<<<<<<<<<<<<<< SENDING MAIL >>>>>>>>>>>>>>>>>>>>>>>>>>>>//
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: secureData.ADMIN_EMAIL,
                    pass: secureData.ADMIN_PASS,
                },
            });

            try {
                await transporter.sendMail({
                    from: secureData.ADMIN_EMAIL, // sender address
                    to: email, // list of receivers
                    subject: "otp Verification ✔", // Subject line
                    text: `Your otp is ${genrated_otp} `, // plain text body
                });
            } catch (error) {
                console.log(error);
                throw "mail not send because of invalid credentials.."
            }

            await User.findOneAndUpdate({ email }, {
                otp: genrated_otp
            })

            const message = { message: "otp sended" }
            successHandler(response, message, 200)
        }
        else {
            if (otp !== user.otp) throw "otp not valid"
            const message = { message: "otp verified" }
            successHandler(response, message, 200)
        }
    } catch (error) {
        errorHandler(response, error, 401)
    }

}

const createNewPassword = async (request: Request, response: Response) => {
    try {
        const { email, password, currentPassword } = request.body

        if (password.trim().length == 0) throw "Password field require"
        if (currentPassword.trim().length == 0) throw "current Password field require"

        if (password !== currentPassword) throw "password miss matched.."
        const hasedPassword = await bcrypt.hash(password, 10)
        await User.findOneAndUpdate({ email }, {
            password: hasedPassword
        })
        const message = { message: "password updated" }
        successHandler(response, message, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const signInUser = async (request: Request, response: Response) => {
    try {
        const {
            email,
            password
        } = request.body

        const user: any = await User.findOne({ email })
        if (!user) throw "user not found please sign up first.."
        if (!(user.otpVerification)) throw "verify otp first"
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
}

const userProfile = async (request: Request, response: Response) => {
    try {
        const user = await User.findOne({ email: request.query.email })

        successHandler(response, user, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const updateUserProfile = async (request: Request, response: Response) => {
    try {
        const username = request.body.username.trim();
        const firstname = request.body.firstname.trim();
        const lastname = request.body.lastname.trim();
        const mobile = request.body.mobile.trim();
        const email = request.body.email.trim();
        const address = `${request.body.cityName} (${request.body.stateName}) in ${request.body.countryName}`

        await User.findByIdAndUpdate(request.query.id, {
            username,
            email,
            firstname,
            lastname,
            mobile,
            address
        })
        const data = {
            message: "user updated"
        }
        successHandler(response, data, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const updatePassword = async (request: Request, response: Response) => {

    const oldpass = request.body.oldpass.trim()
    const newpass = request.body.newpass.trim()
    const confirmpass = request.body.confirmpass.trim()

    try {
        const newHasedPassword = await bcrypt.hash(newpass, 10)
        const user: any = await User.findById(request.query.id)
        const isMatchedPass = await bcrypt.compare(oldpass, user?.password)
        if (!isMatchedPass) throw "old Password not match"
        if (newpass !== confirmpass) throw "Enter right password inside confirm password"
        await User.findByIdAndUpdate(request.query.id, {
            password: newHasedPassword
        })
        const data = {
            message: "user password updated"
        }
        successHandler(response, data, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const addCountry = async (request: Request, response: Response) => {
    try {
        const {
            name
        } = request.body

        await Country.create({
            name
        })

        successHandler(response, { message: "added country" }, 201)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const addState = async (request: Request, response: Response) => {
    try {
        const {
            name,
            country
        } = request.body

        await State.create({
            name,
            country
        })

        successHandler(response, { message: "added state" }, 201)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const addCity = async (request: Request, response: Response) => {
    try {
        const {
            name,
            state
        } = request.body

        await City.create({
            name,
            state
        })

        successHandler(response, { message: "city added" }, 201)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const getAllCountry = async (request: Request, response: Response) => {
    try {
        const countries = await Country.find()

        successHandler(response, countries, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const getAllStates = async (request: Request, response: Response) => {
    try {
        const states = await State.find({ country: request.query.country })

        successHandler(response, states, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const getAllCities = async (request: Request, response: Response) => {
    try {
        const cities = await City.find({ state: request.query.state })

        successHandler(response, cities, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

function checkURL(url: any) {
    return (url.match(/\.(mp4)$/) != null);
}

const addProductData = async (request: Request, response: Response) => {
    const image = request.file?.filename
    const userId = request.query.userId

    const name = request.query.name
    const description = request.query.description

    if (checkURL(`public/images/${image}`)) {
        const onlyName = image?.split('.mp4')[0]
        await ffmpeg(`public/images/${image}`)
            .screenshots({
                count: 1,
                filename: `tn-${onlyName}.jpg`,
                folder: 'public/images'
            })

        try {
            await Product.create({
                productName: name,
                productDescription: description,
                userId,
                image,
                thumbnail: `tn-${onlyName}.jpg`
            })

            successHandler(response, { message: "product created" }, 201)
        } catch (error) {
            errorHandler(response, error, 401)
        }
    }
    else {
        try {
            await Product.create({
                productName: name,
                productDescription: description,
                userId,
                image
            })

            successHandler(response, { message: "product created" }, 201)
        } catch (error) {
            errorHandler(response, error, 401)
        }
    }


}

const getAllProducts = async (request: Request, response: Response) => {
    try {
        const value = request.query.value
        const id: any = request.query.userId
        const userId = new mongoose.Types.ObjectId(id)
        const searchData = request.query.value
            ? {
                $match: {
                    productName: { $regex: value, $options: 'i' }
                },
            }
            : { $match: {} };
        const products = await Product.aggregate([
            {
                $match: {
                    userId
                }
            },
            searchData
        ])

        successHandler(response, products, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const AllProducts = async (request: Request, response: Response) => {
    const value = request.query.value
    const _page:any = request.query._page
    const _limit:any = request.query._limit
    const dataLimit = parseInt(_limit)
    const dataSkip = (_page - 1) * dataLimit
    const searchData = request.query.value
        ? {
            $match: {
                productName: { $regex: value, $options: 'i' }
            },
        }
        : { $match: {} }

    try {
        const products = await Product.aggregate([
            searchData
        ])
        .skip(dataSkip)
        .limit(dataLimit)
        successHandler(response, products, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const productById = async (request: Request, response: Response) => {
    try {
        const product = await Product.findById(request.query.productId)

        successHandler(response, product, 200)
    } catch (error) {
        errorHandler(response, error, 400)
    }
}

const updateProduct = async (request: Request, response: Response) => {

    const productName = request.query.name
    const productDescription = request.query.description
    const image = request.file?.filename

    const product = await Product.findById(request.query.id)

    if (product?.image) {
        const imageData = product.image;
        fs.unlink(`public/images/${imageData}`, (e) => {
            if (e) {
                console.log(e);
            } else {
                console.log("file deleted success..");
            }
        });
    }

    try {
        await Product.findByIdAndUpdate(request.query.id, {
            productName: productName,
            productDescription: productDescription,
            image
        })

        successHandler(response, { message: "product updated" }, 200)
    } catch (error) {
        errorHandler(response, error, 401)
    }
}

const deleteProduct = async (request: Request, response: Response) => {

    try {
        const product = await Product.findById(request.query.id)

        if (product?.image) {
            const imageData = product.image;
            fs.unlink(`public/images/${imageData}`, (e) => {
                if (e) {
                    console.log(e);
                } else {
                    console.log("file deleted success..");
                }
            });
        }

        await Product.findByIdAndDelete(request.query.id)

        successHandler(response, { message: "product deleted" }, 200)
    } catch (error) {
        errorHandler(response, error, 400)
    }
}

export {
    signupUser,
    verifyOtp,
    forgotUserPassword,
    createNewPassword,
    signInUser,
    userProfile,
    updateUserProfile,
    updatePassword,
    resendOtp,
    addCountry,
    addState,
    addCity,
    getAllCountry,
    getAllStates,
    getAllCities,
    addProductData,
    getAllProducts,
    productById,
    updateProduct,
    deleteProduct,
    AllProducts
}