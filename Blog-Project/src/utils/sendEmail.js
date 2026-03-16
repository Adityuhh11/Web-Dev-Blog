import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.htmlMessage
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to", options.email);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendEmail;
