import { mongo } from '../../../config/mongo';
import { Session } from '../../../domain/entities/Session';
import { ISessionsRepository } from '../ISessionsRepository';

const collection = 'sessions';

export class MongoSessionsRepository implements ISessionsRepository {
    async deleteById(sessionId: string): Promise<void> {
        const filter = { uuid: sessionId };
        await mongo.getDb().collection(collection).findOneAndDelete(filter);
    }

    async findById(sessionId: string): Promise<Session | null> {
        const filter = { uuid: sessionId };
        const doc = await mongo.getDb().collection(collection).findOne(filter);
        if (!doc) return null;
        return Session.create(doc.props, doc.uuid);
    }

    async refresh(
        sessionId: string,
        expiresIn: number
    ): Promise<Session | null> {
        const filter = { uuid: sessionId };
        await mongo
            .getDb()
            .collection(collection)
            .findOneAndUpdate(filter, {
                $set: { 'props.expiresIn': expiresIn },
            });
        return await this.findById(sessionId);
    }

    async save(session: Session): Promise<void> {
        await mongo
            .getDb()
            .collection(collection)
            .insertOne({ ...session });
    }
}
