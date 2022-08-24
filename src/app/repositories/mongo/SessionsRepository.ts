import { mongo } from '../../../config/mongo';
import { Session } from '../../../core/entities/Session';
import { ISessionsRepository } from '../ISessionsRepository';

export class SessionsRepository implements ISessionsRepository {
    private readonly collection = 'sessions';

    async get(refreshToken: string): Promise<Session | null> {
        const filter = { 'props.refreshToken': refreshToken };
        const doc = await mongo
            .getDb()
            .collection(this.collection)
            .findOne(filter);
        if (!doc) return null;
        return new Session(doc.props, doc.uuid);
    }

    async save(session: Session): Promise<void> {
        await mongo
            .getDb()
            .collection(this.collection)
            .insertOne({ ...session });
    }

    async delete(session: Session): Promise<void> {
        const filter = { uuid: session.id };
        await mongo.getDb().collection(this.collection).deleteOne(filter);
    }
}
