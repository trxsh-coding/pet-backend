import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

export const sendEmail = async options => {
    const transoprter = nodemailer.createTransport(smtpTransport({
            service: `gmail`,
            host: `smtp.gmail.com`,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    )
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: options.email,
        subject:options.subject,
        text:options.text
    }
    await transoprter.sendMail(mailOptions)
}

