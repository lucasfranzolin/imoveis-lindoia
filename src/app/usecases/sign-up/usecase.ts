import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config';
import { Realtor } from '../../../core/entities/Realtor';
import { RealtorStatus } from '../../../core/enums';
import { EmailAlreadyBeingUsedError } from '../../api-errors/EmailAlreadyBeingUsedError';
import { IMailProvider } from '../../providers/interfaces/IMailProvider';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    fullName: string;
    email: string;
    password: string;
};

export class SignUpUseCase {
    constructor(
        private realtorsRepository: IRealtorsRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute({ fullName, email, password }: RequestDTO): Promise<void> {
        const realtor = await this.realtorsRepository.findByEmail(email);
        if (realtor) throw new EmailAlreadyBeingUsedError(email);
        const passwordHash = bcrypt.hashSync(password, 10);
        const confirmationToken = jwt.sign(
            { email },
            config.jwt.confirmationToken.secret
        );

        const link = `${config.endpoint}/auth/verify/${confirmationToken}`;

        await this.mailProvider.sendMail({
            body: `
            <div>
                <h1>Olá, ${fullName}!</h1>
                <br />
                <p><a href="${link}">Clique aqui</a> para confirmar sua conta.</p>
            </div>
            `,
            subject: 'Seja bem-vindo à plataforma Imóveis Lindóia!',
            to: {
                email,
                name: fullName,
            },
        });

        const newRealtor = Realtor.create({
            email,
            fullName,
            password: passwordHash,
            confirmationToken,
            status: RealtorStatus.PENDING,
        });
        await this.realtorsRepository.save(newRealtor);
    }
}
