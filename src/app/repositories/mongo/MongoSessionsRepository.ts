import { mongo } from '../../../config/mongo';
import { Session } from '../../../core/entities/Session';
import { ISessionsRepository } from '../ISessionsRepository';

const collection = 'sessions';

export class MongoSessionsRepository implements ISessionsRepository {
    async deleteAllByRealtorId(realtorId: string): Promise<void> {
        const filter = { 'props.realtorId': realtorId };
        await mongo.getDb().collection(collection).deleteMany(filter);
    }

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

    async update(session: Session): Promise<void> {
        const filter = { uuid: session.id };
        await mongo
            .getDb()
            .collection(collection)
            .findOneAndUpdate(filter, {
                $set: {
                    props: session.props,
                },
            });
    }

    async save(session: Session): Promise<void> {
        await mongo
            .getDb()
            .collection(collection)
            .insertOne({ ...session });
    }
}
