import { ISessionsRepository } from '../../app/repositories/ISessionsRepository';
import { Session } from '../../domain/entities/Session';

export class InMemorySessionsRepository implements ISessionsRepository {
    public items: Session[] = [];

    async deleteById(sessionId: string): Promise<void> {
        this.items = this.items.filter((session) => session.id !== sessionId);
    }

    async findById(sessionId: string): Promise<Session | null> {
        const session = this.items.find((session) => session.id === sessionId);
        if (!session) return null;
        return session;
    }

    async refresh(
        sessionId: string,
        expiresIn: number
    ): Promise<Session | null> {
        this.items = this.items.map((session) => {
            if (session.id === sessionId) {
                session = Session.create(
                    {
                        expiresIn,
                        realtorId: session.props.realtorId,
                    },
                    sessionId
                );
            }
            return session;
        });
        return this.findById(sessionId);
    }

    async save(session: Session): Promise<void> {
        this.items.push(session);
    }
}
