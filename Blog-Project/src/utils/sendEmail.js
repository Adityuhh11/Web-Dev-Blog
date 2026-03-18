import { Resend } from 'resend';

let resendInstance = null;

const sendEmail = async (options) => {
    if (!resendInstance) {
        resendInstance = new Resend(process.env.RESEND_API_KEY);
    }

    try {
        const { data, error } = await resendInstance.emails.send({
            from: process.env.EMAIL_FROM || 'Acme <onboarding@resend.dev>',
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.htmlMessage
        });

        if (error) {
            console.error("Resend API returned an error:", error);
            return;
        }

        console.log("Email sent successfully to", options.email, "Message ID:", data.id);
    } catch (error) {
        console.error("Error sending email via Resend:", error);
    }
};

export default sendEmail;
