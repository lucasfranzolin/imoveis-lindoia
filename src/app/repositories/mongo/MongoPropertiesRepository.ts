import { mongo } from '../../../config/mongo';
import { Property } from '../../../core/entities/Property';
import { IPropertiesRepository } from '../IPropertiesRepository';

const collection = 'properties';

export class MongoPropertiesRepository implements IPropertiesRepository {
    async save(property: Property): Promise<void> {
        await mongo
            .getDb()
            .collection(collection)
            .insertOne({ ...property });
    }
}
