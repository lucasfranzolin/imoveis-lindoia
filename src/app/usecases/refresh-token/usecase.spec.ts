import { getUnixTime } from 'date-fns';

import { Session } from '../../../core/entities/Session';
import { InMemoryRealtorsRepository } from '../../../test-utils/repositories/InMemoryRealtorsRepository';
import { InMemorySessionsRepository } from '../../../test-utils/repositories/InMemorySessionsRepository';
import { ITokenProvider } from '../../providers/interfaces/ITokenProvider';
import { TokenProvider } from '../../providers/TokenProvider';
import { RefreshTokenUseCase } from './usecase';

describe('refresh-token', () => {
    let sessionsRepository: InMemorySessionsRepository;
    let realtorsRepository: InMemoryRealtorsRepository;
    let tokenProvider: ITokenProvider;
    let sut: RefreshTokenUseCase;

    beforeEach(() => {
        sessionsRepository = new InMemorySessionsRepository();
        realtorsRepository = new InMemoryRealtorsRepository();
        tokenProvider = new TokenProvider();
        sut = new RefreshTokenUseCase(
            sessionsRepository,
            realtorsRepository,
            tokenProvider
        );
    });

    afterEach(() => {
        sessionsRepository.items = [];
        realtorsRepository.items = [];
    });

    it('should check if session is valid', async () => {
        await expect(sut.execute({ sessionId: 'invalidId' })).rejects.toThrow();
    });

    it('should return new session if session is expired', async () => {
        const mockRealtorId = 'test123';
        const expiredSession = Session.create(
            {
                realtorId: mockRealtorId,
                expiresIn: 0,
            },
            mockRealtorId
        );
        sessionsRepository.items.push(expiredSession);
        const result = await sut.execute({ sessionId: mockRealtorId });
        expect(result.session.props.expiresIn).toBeGreaterThan(
            expiredSession.props.expiresIn
        );
    });

    it('should return same session if token is not expired', async () => {
        const mockRealtorId = 'anothr';
        const old = getUnixTime(new Date(3022, 1, 1, 0, 0, 0));
        const expiredSession = Session.create(
            {
                realtorId: mockRealtorId,
                expiresIn: old,
            },
            mockRealtorId
        );
        sessionsRepository.items.push(expiredSession);
        const result = await sut.execute({ sessionId: mockRealtorId });
        expect(result.session).toBe(expiredSession);
    });
});
