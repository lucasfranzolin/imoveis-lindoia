import { Pagination } from '../../core/types';
import { Customer, Props as CustomerProps } from '../../core/entities/Customer';

export interface ICustomersRepository {
    findByEmail(email: string): Promise<Customer | null>;
    findById(realtorId: string): Promise<Customer | null>;
    list(params: Pagination<CustomerProps>): Promise<Array<Customer>>;
    save(realtor: Customer): Promise<void>;
}
