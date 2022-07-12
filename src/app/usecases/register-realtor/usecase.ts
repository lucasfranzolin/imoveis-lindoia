import httpStatus from 'http-status';
import { config } from '../../../config/config';
import { Realtor } from '../../../core/entities/Realtor';
import { ApiError } from '../../ApiError';
import { IMailProvider } from '../../providers/interfaces/IMailProvider';
import { IPasswordProvider } from '../../providers/interfaces/IPasswordProvider';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    email: string;
    name: string;
    password: string;
};

type ResponseDTO = Promise<void>;

export class RegisterRealtorUseCase {
    constructor(
        private realtorsRepository: IRealtorsRepository,
        private passwordProvider: IPasswordProvider,
        private mailProvider: IMailProvider
    ) {}

    async execute({ email, name, password }: RequestDTO): ResponseDTO {
        const [, domain] = email.split('@');
        if (domain.toLowerCase() !== config.mail.domain) {
            throw new ApiError(
                httpStatus.NOT_ACCEPTABLE,
                `O domínio '${domain}' não é permitido.`
            );
        }
        const realtor = await this.realtorsRepository.findByEmail(email);
        if (realtor) {
            throw new ApiError(
                httpStatus.CONFLICT,
                'O email fornecido já está em uso.'
            );
        }
        const passwordHash = await this.passwordProvider.encode(password);
        const newRealtor = Realtor.create({
            email,
            password: passwordHash,
        });
        await this.realtorsRepository.save(newRealtor);
        // await this.mailProvider.sendMail({
        //     to: {
        //         email,
        //         name,
        //     },
        //     body: `
        //         <div>
        //             <h4>Ola, ${name}</h4>
        //             <p>Seja bem vindo a Imoveis Lindoia.</p>
        //         </div>
        //     `,
        //     subject: 'Boas vindas!',
        // });
    }
}
