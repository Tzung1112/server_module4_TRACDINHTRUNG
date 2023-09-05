import { Request, Response } from "express"
import Text from '../text'
import userModel, { NewUser } from "../models/user.model";
import mail, { templates } from "../services/mail";
import jwt from "../services/jwt";
import bcrypt from "bcrypt"

export default {
    register:async function (req:Request, res:Response){
        try{
            req.body.password = await bcrypt.hash(req.body.password, 10);
            let newUser:NewUser={
                ...req.body,
                createAt:new Date(Date.now()),
                updateAt:new Date(Date.now()),

            }
            let modelRes=await userModel.register(newUser);
            modelRes.message=(Text(String(req.headers.language))as any)[modelRes.message]
              if(modelRes.status) {
                mail.sendMail({
                    to: `${modelRes.data?.email}`,
                    subject: "Xác thực email",
                    html: templates.emailConfirm({
                        confirmLink: `${process.env.SERVER_URL}auth/email-confirm/${jwt.createToken(modelRes.data, "30000")}`,
                        language: String(req.headers.language),
                        productName: "Miêu Store",
                        productWebUrl: "abc.com",
                        receiverName: modelRes.data?.firstName + '' + modelRes.data?.lastName
                    })
                })
            }

            return res.status(modelRes.status ? 200 : 213).json(modelRes);

        }catch(err){
            return res.status(500).json({
                message:Text(String(req.headers.language)).controllerErr
            })
        }
    },
     login: async function(req: Request, res: Response) {
        console.log("🚀 ~ file: user.controller.ts:43 ~ login:function ~ req:", req.body)
        try {
            let modelRes = await userModel.inforByUserName(req.body.userName);
           
            if(modelRes.status) {
                 if(!modelRes.data?.isActive) {
                    return res.status(213).json({
                        message: "Người dùng đang bị tạm khóa"
                    });
                 }
                 let checkPassword = await bcrypt.compare(req.body.password, modelRes.data.password);
                 if (!checkPassword) {
                    return res.status(213).json({
                        message: "Mật khẩu không chính xác"
                    });
                 }
                 return res.status(200).json({
                    message: "Đăng nhập thành công",
                    token: jwt.createToken(modelRes.data, "1d")
                });
            }
            return res.status(modelRes.status ? 200 : 213).json({
                message: "Người dùng không tồn tại!"
            });
        }catch(err) {
             return res.status(500).json({
                  messsage: Text(String(req.headers.language)).controllerErr
             })
        }
     },
}