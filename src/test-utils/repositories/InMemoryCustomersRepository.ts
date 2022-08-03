import { ICustomersRepository } from '../../app/repositories/ICustomersRepository';
import { Pagination } from '../../core/types';
import { Customer, Props as CustomerProps } from '../../core/entities/Customer';
import { asc, desc } from '../sortEntities';

export class InMemoryCustomersRepository implements ICustomersRepository {
    public items: Array<Customer> = [];

    async count(): Promise<number> {
        return this.items.length;
    }

    async deleteById(customerId: string): Promise<void> {
        this.items = this.items.filter((item) => item.id !== customerId);
    }

    async findByEmail(email: string): Promise<Customer | null> {
        const customer = this.items.find((item) => item.props.email === email);
        if (!customer) return null;
        return customer;
    }

    async findById(customerId: string): Promise<Customer | null> {
        const customer = this.items.find(
            (customer) => customer.id === customerId
        );
        if (!customer) return null;
        return customer;
    }

    async list({
        limit,
        order,
        page,
        sortBy,
    }: Pagination<CustomerProps>): Promise<Array<Customer>> {
        let customers = this.items;
        if (page && limit) customers = customers.slice(page, page * limit);
        if (sortBy) {
            const sortASC = order > 0;
            return sortASC
                ? customers.sort(asc(sortBy))
                : customers.sort(desc(sortBy));
        }
        return customers;
    }

    async save(customer: Customer): Promise<void> {
        this.items.push(customer);
    }

    async update(customer: Customer): Promise<void> {
        this.items = this.items.map((item) =>
            item.id === customer.id ? customer : item
        );
    }
}
