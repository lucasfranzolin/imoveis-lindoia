import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { config } from '../../config/config';

import { IMailProvider, IMessage } from './interfaces/IMailProvider';

export class MailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = createTransport({
            host: config.mail.host,
            port: config.mail.port,
            auth: {
                user: config.mail.auth.user,
                pass: config.mail.auth.password,
            },
        });
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
