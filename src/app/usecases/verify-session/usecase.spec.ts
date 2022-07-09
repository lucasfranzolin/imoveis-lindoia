import { InMemorySessionsRepository } from '../../../test-utils/repositories/InMemorySessionsRepository';
import { VerifySessionUseCase } from './usecase';

describe('get-realtor-by-session', () => {
    let sessionsRepository: InMemorySessionsRepository;
    let sut: VerifySessionUseCase;

    beforeEach(() => {
        sessionsRepository = new InMemorySessionsRepository();
        sut = new VerifySessionUseCase(sessionsRepository);
    });

    afterEach(() => {
        sessionsRepository.items = [];
    });
});
