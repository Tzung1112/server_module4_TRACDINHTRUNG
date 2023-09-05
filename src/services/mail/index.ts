import nodemailer from "nodemailer";
import emailConfirm from "./templates/emailConfirm";

export interface MaiOption{
    to:string, // Nguoi nhan
    subject:string,//Chu de
    html?:string,//Template HTML
    text?:string// Van ban
}
export const templates={
    
    emailConfirm:emailConfirm
}
export default{
    sendMail: async(mailOption:MaiOption)=>{
        try{
            const transporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:process.env.MS_USER,
                    pass:process.env.MS_PW
                }
            });
            await transporter.sendMail({
                from:process.env.MS_USER,
                ...mailOption
            })
            return true
        }catch(err){
            return false
        }
    }
}