import { Request, Response } from 'express'
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';

import { successHandler, errorHandler } from "../handler/responseHandler";
import secureData from '../security/data'
import User from "../models/userSchema";
import * as bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';

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

export {
    signupUser,
    verifyOtp,
    forgotUserPassword,
    createNewPassword,
    signInUser,
    userProfile,
    updateUserProfile,
    // fileUpload,
    updatePassword,
    resendOtp
}