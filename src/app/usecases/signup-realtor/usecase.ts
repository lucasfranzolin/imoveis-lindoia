import httpStatus from 'http-status';
import { Realtor } from '../../../core/entities/Realtor';
import { ApiError } from '../../ApiError';
import { IPasswordProvider } from '../../providers/interfaces/IPasswordProvider';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    email: string;
    password: string;
};

type ResponseDTO = Promise<void>;

export class SignUpRealtorUseCase {
    constructor(
        private realtorsRepository: IRealtorsRepository,
        private passwordProvider: IPasswordProvider
    ) {}

    async execute({ email, password }: RequestDTO): ResponseDTO {
        const allowedDomain = 'imoveislindoia.com.br';
        const [, domain] = email.split('@');
        if (domain.toLowerCase() !== allowedDomain) {
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
    }
}
