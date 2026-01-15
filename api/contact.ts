import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(request: VercelRequest, response: VercelResponse) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = request.body;

    // Validation
    if (!name || !email || !message) {
        return response.status(400).json({ error: 'Bitte füllen Sie alle Felder aus.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS, // App Password
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'berkay.seckin1@gmail.com',
            subject: `Neue Anfrage von ${name}`,
            text: `
Name: ${name}
Email: ${email}

Nachricht:
${message}
            `,
            html: `
<h3>Neue Anfrage über die Webseite</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<br/>
<p><strong>Nachricht:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return response.status(200).json({ success: true });
    } catch (error) {
        console.error('Email send failed:', error);
        return response.status(500).json({ error: 'Fehler beim Senden der Email.' });
    }
}
