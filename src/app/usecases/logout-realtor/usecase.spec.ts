import { Session } from '../../../core/entities/Session';
import { InMemorySessionsRepository } from '../../../test-utils/repositories/InMemorySessionsRepository';
import { LogoutRealtorUseCase } from './usecase';

describe('logout-realtor', () => {
    let sessionsRepository: InMemorySessionsRepository;
    let sut: LogoutRealtorUseCase;

    beforeEach(() => {
        sessionsRepository = new InMemorySessionsRepository();
        sut = new LogoutRealtorUseCase(sessionsRepository);
    });

    afterEach(() => {
        sessionsRepository.items = [];
    });

    it('should check if session is valid', async () => {
        await expect(sut.execute({ sessionId: 'invalidId' })).rejects.toThrow();
    });

    it('should delete session', async () => {
        const mockSessionId = 'test123';
        const session = Session.create(
            {
                realtorId: 'xxxx',
                expiresIn: 0,
            },
            mockSessionId
        );
        sessionsRepository.items.push(session);
        expect(sessionsRepository.items.length).toBe(1);
        await sut.execute({ sessionId: mockSessionId });
        expect(sessionsRepository.items.length).toBe(0);
    });
});
