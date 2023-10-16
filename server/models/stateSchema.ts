import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    name:{
        type:String
    },
    country:{
        type:String
    }
})

const State = mongoose.model('State',stateSchema)

export default State