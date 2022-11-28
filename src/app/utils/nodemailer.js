const nodemailer = require('nodemailer');
const mailConfig = require('../../config/mail');
const dotenv = require('dotenv');
dotenv.config();

const sendMail = (to, subject, htmlContent) => {
    const transport = nodemailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure:false,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD,
        }
    })

    const options = {
        from: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent
    }
    return transport.sendMail(options)
}
module.exports = {sendMail}
