import { Pagination } from '../../../core/types';
import {
    Customer,
    Props as CustomerProps,
} from '../../../core/entities/Customer';
import { ICustomersRepository } from '../ICustomersRepository';
import { IMongoDataService } from '../../services/interfaces/IMongoDataService';
import { MongoDataService } from '../../services/MongoDataService';

export class CustomersRepository implements ICustomersRepository {
    private readonly collection = 'customers';
    private mongoDataService: IMongoDataService;

    constructor() {
        this.mongoDataService = new MongoDataService();
    }

    async count(): Promise<number> {
        return await this.mongoDataService.countDocuments(this.collection);
    }

    async deleteById(customerId: string): Promise<void> {
        const filter = { uuid: customerId };
        await this.mongoDataService.deleteOne<Customer>(
            this.collection,
            filter
        );
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const filter = { 'props.email': email };
        return await this.mongoDataService.findOne<Customer>(
            this.collection,
            filter
        );
    }

    async findById(customerId: string): Promise<Customer | null> {
        const filter = { uuid: customerId };
        return await this.mongoDataService.findOne<Customer>(
            this.collection,
            filter
        );
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
        return await this.mongoDataService.aggregate(this.collection, agg);
    }

    async save(customer: Customer): Promise<void> {
        await this.mongoDataService.insertOne<Customer>(
            this.collection,
            customer
        );
    }

    async update(customer: Customer): Promise<void> {
        const filter = { uuid: customer.id };
        await this.mongoDataService.updateOne<Customer>(
            this.collection,
            filter,
            {
                $set: {
                    props: customer.props,
                },
            }
        );
    }
}
