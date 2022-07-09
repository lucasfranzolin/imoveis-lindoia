import { Session } from '../../core/entities/Session';

export interface ISessionsRepository {
    deleteAllByRealtorId(realtorId: string): Promise<void>;
    deleteById(sessionId: string): Promise<void>;
    findById(sessionId: string): Promise<Session | null>;
    update(session: Session): Promise<void>;
    save(session: Session): Promise<void>;
}
