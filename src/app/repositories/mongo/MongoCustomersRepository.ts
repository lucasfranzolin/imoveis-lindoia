import { mongo } from '../../../config/mongo';
import { Pagination } from '../../../core/types';
import {
    Customer,
    Props as CustomerProps,
} from '../../../core/entities/Customer';
import { ICustomersRepository } from '../ICustomersRepository';

const collection = 'customers';

export class MongoCustomersRepository implements ICustomersRepository {
    async count(): Promise<number> {
        return await mongo.getDb().collection(collection).countDocuments();
    }

    async deleteById(customerId: string): Promise<void> {
        const filter = { uuid: customerId };
        await mongo.getDb().collection(collection).deleteOne(filter);
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const filter = { 'props.email': email };
        const doc = await mongo.getDb().collection(collection).findOne(filter);
        if (!doc) return null;
        return Customer.create(doc.props, doc.uuid);
    }

    async findById(customerId: string): Promise<Customer | null> {
        const filter = { uuid: customerId };
        const doc = await mongo.getDb().collection(collection).findOne(filter);
        if (!doc) return null;
        return Customer.create(doc.props, doc.uuid);
    }

    async list({
        limit,
        order,
        page,
        sortBy,
    }: Pagination<CustomerProps>): Promise<Array<Customer>> {
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
        return docs.map((doc) => Customer.create(doc.props, doc.uuid));
    }

    async save(customer: Customer): Promise<void> {
        await mongo
            .getDb()
            .collection(collection)
            .insertOne({ ...customer });
    }

    async updateById(
        customerId: string,
        props: CustomerProps
    ): Promise<Customer> {
        const filter = { uuid: customerId };
        const doc = await mongo
            .getDb()
            .collection(collection)
            .findOneAndUpdate(filter, { $set: { props } });
        return Customer.create(doc.value!.props, doc.value!.uuid);
    }
}
