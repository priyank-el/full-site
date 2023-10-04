import mongoose from 'mongoose'

import data from './../security/data'

mongoose.connect(data.MONGO_URL)
.then(()=>console.log("DATABSE CONNECTION ESTABLISHED..."))
.catch((error)=>console.log(error.message))