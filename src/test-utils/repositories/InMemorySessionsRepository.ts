import { ISessionsRepository } from '../../app/repositories/ISessionsRepository';
import { Session } from '../../core/entities/Session';

export class InMemorySessionsRepository implements ISessionsRepository {
    public items: Session[] = [];

    async deleteAllByRealtorId(realtorId: string): Promise<void> {
        this.items = this.items.filter(
            (session) => session.props.realtorId !== realtorId
        );
    }

    async deleteById(sessionId: string): Promise<void> {
        this.items = this.items.filter((session) => session.id !== sessionId);
    }

    async findById(sessionId: string): Promise<Session | null> {
        const session = this.items.find((session) => session.id === sessionId);
        if (!session) return null;
        return session;
    }

    async update(session: Session): Promise<void> {
        this.items = this.items.map((item) => {
            if (item.id === session.id) {
                return session;
            }
            return item;
        });
    }

    async save(session: Session): Promise<void> {
        this.items.push(session);
    }
}
