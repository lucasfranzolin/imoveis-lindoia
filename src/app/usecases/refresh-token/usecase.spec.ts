import { getUnixTime } from 'date-fns';
import { Realtor } from '../../../core/entities/Realtor';

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

    it('should throw if realtor does not exists', async () => {
        const realtor = Realtor.create({
            email: 'test@email.com',
            password: '123',
        });
        expect(realtorsRepository.items.length).toBe(0);
        const expiredSession = Session.create({
            realtorId: realtor.id,
            expiresIn: 0,
        });
        expect(sessionsRepository.items.length).toBe(0);
        sessionsRepository.items.push(expiredSession);
        expect(sessionsRepository.items.length).toBe(1);
        await expect(
            sut.execute({ sessionId: expiredSession.id })
        ).rejects.toThrow();
    });

    it('should return new session if session is expired', async () => {
        expect(realtorsRepository.items.length).toBe(0);
        const realtor = Realtor.create({
            email: 'test@email.com',
            password: '123',
        });
        realtorsRepository.items.push(realtor);
        expect(realtorsRepository.items.length).toBe(1);
        const expiredSession = Session.create({
            realtorId: realtor.id,
            expiresIn: 0,
        });
        expect(sessionsRepository.items.length).toBe(0);
        sessionsRepository.items.push(expiredSession);
        expect(sessionsRepository.items.length).toBe(1);
        const result = await sut.execute({ sessionId: expiredSession.id });
        expect(result.session.props.expiresIn).toBeGreaterThan(
            expiredSession.props.expiresIn
        );
    });

    it('should return same session if token is not expired', async () => {
        expect(realtorsRepository.items.length).toBe(0);
        const realtor = Realtor.create({
            email: 'test@email.com',
            password: '123',
        });
        realtorsRepository.items.push(realtor);
        expect(realtorsRepository.items.length).toBe(1);
        const currentSession = Session.create({
            realtorId: realtor.id,
            expiresIn: getUnixTime(new Date(3022, 1, 1, 0, 0, 0)),
        });
        expect(sessionsRepository.items.length).toBe(0);
        sessionsRepository.items.push(currentSession);
        expect(sessionsRepository.items.length).toBe(1);
        const result = await sut.execute({ sessionId: currentSession.id });
        expect(result.session).toBe(currentSession);
    });
});
