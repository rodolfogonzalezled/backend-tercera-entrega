import nodemailer from 'nodemailer';
import { config } from '../Config/config.js';

export default class mailingService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.emailNodemailer,
                pass: config.passwordNodemailer
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