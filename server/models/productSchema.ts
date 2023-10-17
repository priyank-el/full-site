import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    productDescription:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
})

const Product = mongoose.model('Product',productSchema)

export default Product