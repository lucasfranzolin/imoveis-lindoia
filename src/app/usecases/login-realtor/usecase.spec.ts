import { Realtor } from '../../../core/entities/Realtor';
import { InMemoryRealtorsRepository } from '../../../test-utils/repositories/InMemoryRealtorsRepository';
import { InMemorySessionsRepository } from '../../../test-utils/repositories/InMemorySessionsRepository';
import { IPasswordProvider } from '../../providers/interfaces/IPasswordProvider';
import { ITokenProvider } from '../../providers/interfaces/ITokenProvider';
import { PasswordProvider } from '../../providers/PasswordProvider';
import { TokenProvider } from '../../providers/TokenProvider';
import { LoginRealtorUseCase } from './usecase';

const mockValidEmail = 'test@imoveislindoia.com.br';

describe('login-realtor', () => {
    let realtorsRepository: InMemoryRealtorsRepository;
    let sessionsRepository: InMemorySessionsRepository;
    let passwordProvider: IPasswordProvider;
    let tokenProvider: ITokenProvider;
    let sut: LoginRealtorUseCase;

    beforeEach(() => {
        realtorsRepository = new InMemoryRealtorsRepository();
        sessionsRepository = new InMemorySessionsRepository();
        passwordProvider = new PasswordProvider();
        tokenProvider = new TokenProvider();
        sut = new LoginRealtorUseCase(
            realtorsRepository,
            sessionsRepository,
            passwordProvider,
            tokenProvider
        );
    });

    afterEach(() => {
        realtorsRepository.items = [];
        sessionsRepository.items = [];
    });

    it('should throw if email is not found', async () => {
        await expect(
            sut.execute({
                email: mockValidEmail,
                password: '',
            })
        ).rejects.toThrow();
    });
    it('should accept if passwords matches', async () => {
        const password = 'senha123';
        const hash = await passwordProvider.encode(password);
        const realtor = Realtor.create({
            email: mockValidEmail,
            password: hash,
        });
        realtorsRepository.items.push(realtor);
        await expect(
            sut.execute({
                email: mockValidEmail,
                password,
            })
        ).resolves.toBeTruthy();
    });
    it('should throw if password is not a match', async () => {
        const invalidStrPwd = 'aaaaaaaa';
        const strPwd = 'senha123';
        const hash = await passwordProvider.encode(strPwd);
        const realtor = Realtor.create({
            email: mockValidEmail,
            password: hash,
        });
        realtorsRepository.items.push(realtor);
        await expect(
            sut.execute({
                email: mockValidEmail,
                password: invalidStrPwd,
            })
        ).rejects.toThrow();
    });
});
