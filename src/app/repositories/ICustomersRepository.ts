import { Pagination, PaginationResult } from '../../core/types';
import { Customer, Props as CustomerProps } from '../../core/entities/Customer';

export interface ICustomersRepository {
    count(): Promise<number>;
    deleteById(customerId: string): Promise<void>;
    findByEmail(email: string): Promise<Customer | null>;
    findById(customerId: string): Promise<Customer | null>;
    list(params: Pagination<CustomerProps>): Promise<Array<Customer>>;
    save(realtor: Customer): Promise<void>;
    updateById(customerId: string, props: CustomerProps): Promise<Customer>;
}
