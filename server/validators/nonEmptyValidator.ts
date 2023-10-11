import { Request, Response } from "express"
import { errorHandler } from "../handler/responseHandler"

const nonemptyValidator = (request:Request,response:Response,next:any) => {

   try {
     const username = request.body.username
     const firstname = request.body.firstname
     const lastname = request.body.lastname
     const mobile = request.body.mobile
     const email = request.body.email.trim();

      const check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const isEmail = check.test(email)
      if(!isEmail) throw "Enter proper email address"
      const filteredUsername = username.trim().length 
      if(filteredUsername == 0) throw "username should not empty"
      const filteredFirstname = firstname.trim().length 
      if(filteredFirstname == 0) throw "firstname should not empty"
      const filteredLastname = lastname.trim().length 
      if(filteredLastname == 0) throw "lastname should not empty"
      const filteredMobile = mobile.trim().length 
      if(filteredMobile == 0) throw "mobile number should not empty"
      const parseIntoNumber = parseInt(mobile)
      if(!parseIntoNumber) throw "enter proper number"
     next()
   } catch (error) {
        errorHandler(response,error,401)
   }    
}

export default nonemptyValidator