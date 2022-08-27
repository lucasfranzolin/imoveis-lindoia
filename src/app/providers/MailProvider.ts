import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { config } from '../../config/config';

import { IMailProvider, IMessage } from './interfaces/IMailProvider';

export class MailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        const { host, port, address, auth } = config.mail;
        const { user, password } = auth;
        const options: SMTPTransport.Options = {
            host,
            port,
            auth: {
                user: config.env === 'dev' ? user : address,
                pass: password,
            },
        };
        this.transporter = createTransport(options);
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            from: {
                name: config.mail.name,
                address: config.mail.address,
            },
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            subject: message.subject,
            html: message.body,
        });
    }
}
