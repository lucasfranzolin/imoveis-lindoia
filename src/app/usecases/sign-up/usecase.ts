import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config';
import { Realtor } from '../../../core/entities/Realtor';
import { RealtorStatus } from '../../../core/enums';
import { EmailAlreadyBeingUsedError } from '../../api-errors/EmailAlreadyBeingUsedError';
import { IMailProvider } from '../../providers/interfaces/IMailProvider';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    email: string;
    password: string;
};

export class SignUpUseCase {
    constructor(
        private realtorsRepository: IRealtorsRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute({ email, password }: RequestDTO): Promise<void> {
        const realtor = await this.realtorsRepository.findByEmail(email);
        if (realtor) throw new EmailAlreadyBeingUsedError(email);
        const passwordHash = bcrypt.hashSync(password, 10);
        const confirmationToken = jwt.sign(
            { email },
            config.jwt.confirmationToken.secret
        );

        const link = `${config.endpoint}/auth/verify/${confirmationToken}`;

        await this.mailProvider.sendMail({
            body: `<a href="${link}">Clique aqui</a> para confirmar sua conta.`,
            subject: 'Seja bem-vindo à plataforma Imóveis Lindóia!',
            to: {
                email,
                name: 'Nome do cidadao',
            },
        });

        const newRealtor = Realtor.create({
            email,
            password: passwordHash,
            confirmationToken,
            status: RealtorStatus.PENDING,
        });
        await this.realtorsRepository.save(newRealtor);
    }
}
