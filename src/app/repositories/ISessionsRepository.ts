import { Session } from '../../core/entities/Session';

export interface ISessionsRepository {
    deleteById(sessionId: string): Promise<void>;
    findById(sessionId: string): Promise<Session | null>;
    refresh(sessionId: string, expiresIn: number): Promise<Session | null>;
    save(session: Session): Promise<void>;
}
