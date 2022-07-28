import { mongo } from '../../../config/mongo';
import { Property } from '../../../core/entities/Property';
import { IPropertiesRepository } from '../IPropertiesRepository';

const collection = 'properties';

export class MongoPropertiesRepository implements IPropertiesRepository {
    async findById(customerId: string): Promise<Property | null> {
        const filter = { uuid: customerId };
        const doc = await mongo.getDb().collection(collection).findOne(filter);
        if (!doc) return null;
        return Property.create(doc.props, doc.uuid);
    }

    async save(property: Property): Promise<void> {
        await mongo
            .getDb()
            .collection(collection)
            .insertOne({ ...property });
    }
}
