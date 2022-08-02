import httpStatus from 'http-status';
import { Realtor } from '../../../core/entities/Realtor';
import { EmailAlreadyBeingUsedError } from '../../api-errors/EmailAlreadyBeingUsedError';
import { ApiError } from '../../ApiError';
import { IMailProvider } from '../../providers/interfaces/IMailProvider';
import { IPasswordProvider } from '../../providers/interfaces/IPasswordProvider';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    email: string;
    name: string;
    password: string;
};

export class RegisterRealtorUseCase {
    constructor(
        private realtorsRepository: IRealtorsRepository,
        private passwordProvider: IPasswordProvider,
        private mailProvider: IMailProvider
    ) {}

    async execute({ email, name, password }: RequestDTO): Promise<void> {
        const realtor = await this.realtorsRepository.findByEmail(email);
        if (realtor) throw new EmailAlreadyBeingUsedError(email);

        const passwordHash = await this.passwordProvider.encode(password);

        let newRealtor;
        try {
            newRealtor = Realtor.create({
                email,
                password: passwordHash,
            });
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, err as string);
        }

        await this.realtorsRepository.save(newRealtor);
    }
}
