import { mongo } from '../../../config/mongo';
import {
    Property,
    Props as PropertyProps,
} from '../../../core/entities/Property';
import { Pagination } from '../../../core/types';
import { IPropertiesRepository } from '../IPropertiesRepository';

export class PropertiesRepository implements IPropertiesRepository {
    private readonly collection = 'properties';
    private locationIndex: string = 'locationIndex';
    private locationIndexExists: boolean = false;

    async count(): Promise<number> {
        return await (await mongo.getDb())
            .collection(this.collection)
            .countDocuments();
    }

    async deleteById(propertyId: string): Promise<void> {
        const filter = { uuid: propertyId };
        await (await mongo.getDb())
            .collection(this.collection)
            .deleteOne(filter);
    }

    async findById(customerId: string): Promise<Property | null> {
        const filter = { uuid: customerId };
        const doc = await (await mongo.getDb())
            .collection(this.collection)
            .findOne(filter);
        if (!doc) return null;
        return new Property(doc.props, doc.uuid);
    }

    async save(property: Property): Promise<void> {
        await this.checkLocationIndex();
        await (await mongo.getDb())
            .collection(this.collection)
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
        const docs = await (await mongo.getDb())
            .collection(this.collection)
            .aggregate(agg)
            .toArray();
        return docs.map((doc) => new Property(doc.props, doc.uuid));
    }

    async update(property: Property): Promise<void> {
        const filter = { uuid: property.id };
        await (await mongo.getDb())
            .collection(this.collection)
            .updateOne(filter, {
                $set: {
                    props: property.props,
                },
            });
    }

    async findByOwnerId(ownerId: string): Promise<Array<Property>> {
        const filter = { 'props.ownerId': ownerId };
        const docs = await (await mongo.getDb())
            .collection(this.collection)
            .find(filter)
            .toArray();
        return docs.map((doc) => new Property(doc.props, doc.uuid));
    }

    private async checkLocationIndex() {
        const collections = await (await mongo.getDb()).collections();
        const collectionExists = collections
            .map((item) => item.collectionName)
            .includes(this.collection);
        if (this.locationIndexExists || !collectionExists) return;

        this.locationIndexExists = await (await mongo.getDb())
            .collection(this.collection)
            .indexExists(this.locationIndex);

        if (!this.locationIndexExists) {
            await (await mongo.getDb()).collection(this.collection).createIndex(
                {
                    location: 1,
                },
                {
                    name: this.locationIndex,
                }
            );
        }
    }
}
