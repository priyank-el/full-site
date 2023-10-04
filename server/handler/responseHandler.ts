import { Response } from "express";

const successHandler = (response:Response,data:any,statusCode:number) => {
    return response.status(statusCode).json(data)
}

const errorHandler = (response:Response,error:any,statusCode:number) => {
    return response.status(statusCode).json({error})
}

export {
    successHandler,
    errorHandler
}