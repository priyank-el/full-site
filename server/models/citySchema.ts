import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    name:{
        type:String
    },
    state:{
        type:String
    }
})

const City = mongoose.model('City',citySchema)

export default City 