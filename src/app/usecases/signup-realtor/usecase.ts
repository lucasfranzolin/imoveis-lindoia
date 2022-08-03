import bcrypt from 'bcrypt';
import { Realtor } from '../../../core/entities/Realtor';
import { EmailAlreadyBeingUsedError } from '../../api-errors/EmailAlreadyBeingUsedError';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    email: string;
    password: string;
};

export class SignUpRealtorUseCase {
    constructor(private realtorsRepository: IRealtorsRepository) {}

    async execute({ email, password }: RequestDTO): Promise<void> {
        const realtor = await this.realtorsRepository.findByEmail(email);
        if (realtor) throw new EmailAlreadyBeingUsedError(email);

        const passwordHash = await bcrypt.hash(password, 10);

        const newRealtor = Realtor.create({
            email,
            password: passwordHash,
        });

        await this.realtorsRepository.save(newRealtor);
    }
}
