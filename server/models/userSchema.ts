import mongoose from "mongoose"

const userSchema = new mongoose
    .Schema({
        username: {
            type: String
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        mobile: {
            type: String
        },
        email: {
            type: String
        },
        image: {
            type: String
        },
        address:{
            type:String
        },
        password: {
            type: String
        },
        otp: {
            type: String
        },
        otpVerification: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    })

const User = mongoose.model('User', userSchema)
export default User