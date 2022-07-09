import { getUnixTime } from 'date-fns';
import { Session } from '../../../core/entities/Session';
import { InMemorySessionsRepository } from '../../../test-utils/repositories/InMemorySessionsRepository';
import { VerifySessionUseCase } from './usecase';

describe('verify-session', () => {
    let sessionsRepository: InMemorySessionsRepository;
    let sut: VerifySessionUseCase;

    beforeEach(() => {
        sessionsRepository = new InMemorySessionsRepository();
        sut = new VerifySessionUseCase(sessionsRepository);
    });

    afterEach(() => {
        sessionsRepository.items = [];
    });

    it('should throw if session does not exists', async () => {
        await expect(sut.execute({ sessionId: 'any-id' })).rejects.toThrow();
    });

    it('should not throw if session exists', async () => {
        const session = Session.create({
            expiresIn: getUnixTime(new Date(3022, 1, 1, 0, 0, 0)),
            realtorId: 'test-id',
        });
        expect(sessionsRepository.items.length).toBe(0);
        sessionsRepository.items.push(session);
        expect(sessionsRepository.items.length).toBe(1);
        await expect(
            sut.execute({ sessionId: session.id })
        ).resolves.not.toThrow();
    });
});
