import { Customer } from '../../../core/entities/Customer';
import { CustomerNotFoundError } from '../../api-errors/CustomerNotFoundError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

type RequestDTO = {
    id: string;
};

export class FindCustomerByIdUseCase {
    constructor(private customersRepository: ICustomersRepository) {}

    async execute({ id }: RequestDTO): Promise<Customer> {
        const customer = await this.customersRepository.findById(id);
        if (!customer) throw new CustomerNotFoundError();

        return customer;
    }
}
