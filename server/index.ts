
import './config/db'
import express,{Express} from 'express'

import router from './router/route'

import data from './security/data'
import cors from "cors"

const app:Express = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())
app.use(router)


app.listen(data.PORT,()=>{
    console.log(`SERVER LISTNING ON PORT:${data.PORT}...`);
})