import { Request, Response } from "express";
import { errorHandler } from "../handler/responseHandler";

const addProductValidator = (req: Request, res: Response, next: any) => {
   try {
     const productName = req.query.name
     const productDescription = req.query.description
     const image = req.file?.filename

     if(!image) throw "image is required"
    
     if(!productName) throw "product name is required"
     if(!productDescription) throw "product description is required"
 
     next()
   } catch (error) {
    errorHandler(res,error,401)
   }
}

export {
    addProductValidator
}