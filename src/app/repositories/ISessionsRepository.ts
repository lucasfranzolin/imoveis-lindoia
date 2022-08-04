import { Session } from '../../core/entities/Session';

export interface ISessionsRepository {
    get(refreshToken: string): Promise<Session | null>;
    save(session: Session): Promise<void>;
    delete(session: Session): Promise<void>;
}
