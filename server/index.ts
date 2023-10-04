
import './config/db'
import express,{Express} from 'express'

import router from './router'

import data from './security/data'

const app:Express = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(router)


app.listen(data.PORT,()=>{
    console.log(`SERVER LISTNING ON PORT:${data.PORT}...`);
})