import { mongo } from '../../../config/mongo';
import {
    Property,
    Props as PropertyProps,
} from '../../../core/entities/Property';
import { Pagination } from '../../../core/types';
import { IPropertiesRepository } from '../IPropertiesRepository';

const collection = 'properties';

export class MongoPropertiesRepository implements IPropertiesRepository {
    async count(): Promise<number> {
        return await mongo.getDb().collection(collection).countDocuments();
    }

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

    async list({
        limit,
        order,
        page,
        sortBy,
    }: Pagination<PropertyProps>): Promise<Array<Property>> {
        const agg = [
            { $skip: limit * page }, //
            { $limit: limit },
        ];
        if (sortBy) {
            const by = `props.${sortBy}`;
            agg.unshift({ $sort: { [by]: order } } as any);
        }
        const docs = await mongo
            .getDb()
            .collection(collection)
            .aggregate(agg)
            .toArray();
        return docs.map((doc) => Property.create(doc.props, doc.uuid));
    }
}
