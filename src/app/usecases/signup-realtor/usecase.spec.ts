import dcopy from 'deep-copy';

import { Realtor } from '../../../core/entities/Realtor';
import { InMemoryRealtorsRepository } from '../../../test-utils/repositories/InMemoryRealtorsRepository';
import { IPasswordProvider } from '../../providers/interfaces/IPasswordProvider';
import { PasswordProvider } from '../../providers/PasswordProvider';
import { SignUpRealtorUseCase } from './usecase';

const mock = {
    email: 'test@imoveislindoia.com.br',
    password: '123',
};

describe('signup-realtor', () => {
    let data: any;
    let realtorsRepository: InMemoryRealtorsRepository;
    let passwordProvider: IPasswordProvider;
    let sut: SignUpRealtorUseCase;

    beforeEach(() => {
        data = dcopy(mock);
        realtorsRepository = new InMemoryRealtorsRepository();
        passwordProvider = new PasswordProvider();
        sut = new SignUpRealtorUseCase(realtorsRepository, passwordProvider);
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
