import nodemailer from 'nodemailer';

export class EmailService {

    static async sendEmail(to, subject, text) {
        try {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_GMAIL, 
                    pass: process.env.PASS
                }
            });
        
            const mailOptions = {
                from: process.env.USER_GMAIL,
                to:to,
                subject:subject,
                text:text
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
    

}