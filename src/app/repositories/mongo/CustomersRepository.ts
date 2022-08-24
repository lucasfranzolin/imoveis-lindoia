import { mongo } from '../../../config/mongo';
import { Pagination } from '../../../core/types';
import {
    Customer,
    Props as CustomerProps,
} from '../../../core/entities/Customer';
import { ICustomersRepository } from '../ICustomersRepository';

export class CustomersRepository implements ICustomersRepository {
    private readonly collection = 'customers';

    async count(): Promise<number> {
        return await mongo.getDb().collection(this.collection).countDocuments();
    }

    async deleteById(customerId: string): Promise<void> {
        const filter = { uuid: customerId };
        await mongo.getDb().collection(this.collection).deleteOne(filter);
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const filter = { 'props.email': email };
        const doc = await mongo
            .getDb()
            .collection(this.collection)
            .findOne(filter);
        if (!doc) return null;
        return new Customer(doc.props, doc.uuid);
    }

    async findById(customerId: string): Promise<Customer | null> {
        const filter = { uuid: customerId };
        const doc = await mongo
            .getDb()
            .collection(this.collection)
            .findOne(filter);
        if (!doc) return null;
        return new Customer(doc.props, doc.uuid);
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
            .collection(this.collection)
            .aggregate(agg)
            .toArray();
        return docs.map((doc) => new Customer(doc.props, doc.uuid));
    }

    async save(customer: Customer): Promise<void> {
        await mongo
            .getDb()
            .collection(this.collection)
            .insertOne({ ...customer });
    }

    async update(customer: Customer): Promise<void> {
        const filter = { uuid: customer.id };
        await mongo
            .getDb()
            .collection(this.collection)
            .findOneAndUpdate(filter, {
                $set: {
                    props: customer.props,
                },
            });
    }
}
