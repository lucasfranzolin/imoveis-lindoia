import { mongo } from '../../../config/mongo';
import { Realtor } from '../../../domain/entities/Realtor';
import { IRealtorsRepository } from '../IRealtorsRepository';

const collection = 'realtors';

export class MongoRealtorsRepository implements IRealtorsRepository {
    async findByEmail(email: string): Promise<Realtor | null> {
        const filter = { 'props.email': email };
        const doc = await mongo.getDb().collection(collection).findOne(filter);
        if (!doc) return null;
        return Realtor.create(doc.props, doc.uuid);
    }

    async findById(realtorId: string): Promise<Realtor | null> {
        const filter = { uuid: realtorId };
        const doc = await mongo.getDb().collection(collection).findOne(filter);
        if (!doc) return null;
        return Realtor.create(doc.props, doc.uuid);
    }

    async save(realtor: Realtor): Promise<void> {
        await mongo
            .getDb()
            .collection(collection)
            .insertOne({ ...realtor });
    }
}
