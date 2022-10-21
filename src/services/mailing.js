import nodemailer from 'nodemailer';

export default class mailingService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: 'rgonzalezled@gmail.com',
                pass: 'rltasvhkakqrowyd'
            }
        });
    }

    sendMail = async({from, to, subject, html, attachments=[]}) => {
        let result = await this.transporter.sendMail({
            from,
            to,
            subject,
            html,
            attachments
        })
        return result;
    }
};