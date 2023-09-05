import { Request, Response, NextFunction } from "express"
import Text from '../text'
let ipList = [
    "::ffff:127.0.0.1",
    "58.187.191.113",
    
]
export default {
    ipAuthen: function (req: Request, res: Response, next: NextFunction){
       let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log("🚀 ~ file: guard.ts:10 ~ ipAddress:", ipAddress)
        if(ipList.find(ip => ip == String(ipAddress))){
            console.log(1111);
            return next();
        }
        return res.status(213).json({
            status: false,
            message: Text(String(req.headers.language)).ipAcceptDenine,
            data: null
        })
    },
    
}