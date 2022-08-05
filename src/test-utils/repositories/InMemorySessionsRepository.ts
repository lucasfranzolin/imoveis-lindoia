import { ISessionsRepository } from '../../app/repositories/ISessionsRepository';
import { Session } from '../../core/entities/Session';

export class InMemorySessionsRepository implements ISessionsRepository {
    public items: Array<Session> = [];

    async get(refreshToken: string): Promise<Session | null> {
        const session = this.items.find(
            (item) => item.props.refreshToken === refreshToken
        );
        if (!session) return null;
        return session;
    }

    async save(session: Session): Promise<void> {
        this.items.push(session);
    }

    async delete(session: Session): Promise<void> {
        this.items = this.items.filter((item) => item.id !== session.id);
    }
}
