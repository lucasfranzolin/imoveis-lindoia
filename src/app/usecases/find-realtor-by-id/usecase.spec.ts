import { Realtor } from '../../../core/entities/Realtor';
import { Session } from '../../../core/entities/Session';
import { InMemoryRealtorsRepository } from '../../../test-utils/repositories/InMemoryRealtorsRepository';
import { FindRealtorByIdUseCase } from './usecase';

describe('find-realtor-by-id', () => {
    let realtorsRepository: InMemoryRealtorsRepository;
    let sut: FindRealtorByIdUseCase;

    beforeEach(() => {
        realtorsRepository = new InMemoryRealtorsRepository();
        sut = new FindRealtorByIdUseCase(realtorsRepository);
    });

    afterEach(() => {
        realtorsRepository.items = [];
    });

    it('should throw', async () => {
        await expect(sut.execute({ realtorId: 'test' })).rejects.toThrow();
    });

    it('should find realtor', async () => {
        const realtor = Realtor.create({
            email: 'email@test.jest',
            password: '123',
        });
        expect(realtorsRepository.items.length).toBe(0);
        realtorsRepository.items.push(realtor);
        expect(realtorsRepository.items.length).toBe(1);
        const result = await sut.execute({ realtorId: realtor.id });
        expect(result).toBe(realtor);
    });
});
