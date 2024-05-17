import nodemailer from 'nodemailer'
import config from '../config';

export const sendEmail = async (to:string, html:string )=>{
    const transporter = nodemailer.createTransport({
        host: " smtp.gmail.com.",
        port: 587,
        secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "ibrahimsikder5033@gmail.com",
          pass: "vzly whld ebhi gbwn",
        },
      });



 await transporter.sendMail({
        from: 'ibrahimsikder5033@gmail.com', // sender address
        to: "ibrahimfr4450@gmail.com", // list of receivers
        subject: "Change your password ✔", // Subject line
        text: "Reset your password withing 10m", // plain text body
        html: "<b>Hello world?</b>", // html body
      });


}