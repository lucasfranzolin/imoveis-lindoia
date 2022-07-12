import dcopy from 'deep-copy';

import { Realtor } from '../../../core/entities/Realtor';
import { InMemoryRealtorsRepository } from '../../../test-utils/repositories/InMemoryRealtorsRepository';
import { IPasswordProvider } from '../../providers/interfaces/IPasswordProvider';
import { PasswordProvider } from '../../providers/PasswordProvider';
import { RegisterRealtorUseCase } from './usecase';
import { IMailProvider } from '../../providers/interfaces/IMailProvider';
import { MailProvider } from '../../providers/MailProvider';

const mock = {
    email: 'test@imoveislindoia.com.br',
    name: 'tester top',
    password: '123',
};

describe('signup-realtor', () => {
    let data: any;
    let realtorsRepository: InMemoryRealtorsRepository;
    let passwordProvider: IPasswordProvider;
    let mailProvider: IMailProvider;
    let sut: RegisterRealtorUseCase;

    beforeEach(() => {
        data = dcopy(mock);
        realtorsRepository = new InMemoryRealtorsRepository();
        passwordProvider = new PasswordProvider();
        mailProvider = new MailProvider();
        sut = new RegisterRealtorUseCase(
            realtorsRepository,
            passwordProvider,
            mailProvider
        );
    });

    afterEach(() => {
        realtorsRepository.items = [];
    });

    it('should throw if email domain is invalid', async () => {
        await expect(
            sut.execute({
                ...data,
                email: 'test@outraimobiliaria.com.br',
            })
        ).rejects.toThrow();
    });
    it('should throw if email is already being used', async () => {
        expect(realtorsRepository.items.length).toBe(0);
        realtorsRepository.items.push(Realtor.create(data));
        expect(realtorsRepository.items.length).toBe(1);
        await expect(sut.execute(data)).rejects.toThrow();
        expect(realtorsRepository.items.length).toBe(1);
    });
    it('should be able to save new valid realtor', async () => {
        expect(realtorsRepository.items.length).toBe(0);
        await sut.execute(data);
        expect(realtorsRepository.items.length).toBe(1);
    });
});
