import { mongo } from '../../../config/mongo';
import { Pagination } from '../../../core/types';
import {
    Customer,
    Props as CustomerProps,
} from '../../../core/entities/Customer';
import { ICustomersRepository } from '../ICustomersRepository';

const collection = 'customers';

export class MongoCustomersRepository implements ICustomersRepository {
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
        const by = `props.${sortBy}`;
        const docs = await mongo
            .getDb()
            .collection(collection)
            .aggregate([
                { $skip: limit * page },
                { $limit: limit },
                { $sort: { [by]: order } },
            ])
            .toArray();
        return docs.map((doc) => Customer.create(doc.props, doc.uuid));
    }

    async save(customer: Customer): Promise<void> {
        await mongo
            .getDb()
            .collection(collection)
            .insertOne({ ...customer });
    }
}
