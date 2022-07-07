import { Session } from '../../../domain/entities/Session';
import { IPasswordProvider } from '../../providers/interfaces/IPasswordProvider';
import { ITokenProvider } from '../../providers/interfaces/ITokenProvider';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';
import { ISessionsRepository } from '../../repositories/ISessionsRepository';

type RequestDTO = {
    email: string;
    password: string;
};

type ResponseDTO = Promise<{
    token: string;
    session: Session;
}>;

export class LoginRealtorUseCase {
    constructor(
        private realtorsRepository: IRealtorsRepository,
        private sessionsRepository: ISessionsRepository,
        private passwordProvider: IPasswordProvider,
        private tokenProvider: ITokenProvider
    ) {}

    async execute({ email, password }: RequestDTO): ResponseDTO {
        const realtor = await this.realtorsRepository.findByEmail(email);
        if (!realtor) {
            throw new Error('O email não está cadastrado.');
        }
        const passwordsMatch = await this.passwordProvider.isMatch(
            password,
            realtor.props.password
        );
        if (!passwordsMatch) {
            throw new Error('Senha incorreta.');
        }
        const session = Session.create({
            realtorId: realtor.id,
            expiresIn: this.tokenProvider.calcExpireTime(),
        });
        await this.sessionsRepository.save(session);
        const token = this.tokenProvider.generate(realtor.id);
        return { token, session };
    }
}
