import express,{Request,Response} from "express";

const router = express.Router() 

router.post("/register",(request:Request,response:Response)=>{
    const {
        username,
        email,
        password
    } = request.body

    console.log(username +  email  + password);
    return response
    .json({success:true})
})

export default router