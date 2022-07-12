interface Address {
    email: string;
    name: string;
}

export interface IMessage {
    to: Address;
    subject: string;
    body: string;
}

export interface IMailProvider {
    sendMail(message: IMessage): Promise<void>;
}
