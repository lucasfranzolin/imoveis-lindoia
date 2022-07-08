import { ICustomersRepository } from '../../app/repositories/ICustomersRepository';
import { Pagination } from '../../core/types';
import { Customer, Props as CustomerProps } from '../../core/entities/Customer';
import { asc, desc } from '../sortEntities';

export class InMemoryCustomersRepository implements ICustomersRepository {
    public items: Customer[] = [];

    async findByEmail(email: string): Promise<Customer | null> {
        const customer = this.items.find(
            (customer) => customer.props.email === email
        );
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
        const sortASC = order > 0;
        return sortASC
            ? customers.sort(asc(sortBy))
            : customers.sort(desc(sortBy));
    }

    async save(customer: Customer): Promise<void> {
        this.items.push(customer);
    }
}
