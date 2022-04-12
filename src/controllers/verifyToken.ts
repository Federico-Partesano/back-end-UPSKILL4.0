import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../environment/environment'

export const verifyToken=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const headerToken=req.headers.authorization;
        if(!headerToken) return res.status(401).json({message:'not authorized'});
        const token=headerToken.split(' ')[1];
        if(!token) return res.status(401).json({message:'not authorized'});
        const payload=jwt.verify(token,JWT_KEY);
        if(!payload) return res.status(401).json({message:'not authorized'});
        res.locals.token=token;
        res.locals.payload=jwt.decode(token,{complete:true})?.payload;
        next();
    } catch (error) {
        console.log("error: ", error);
    }
}