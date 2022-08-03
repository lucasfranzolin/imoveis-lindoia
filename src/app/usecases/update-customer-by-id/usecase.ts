import { Customer } from '../../../core/entities/Customer';
import { CustomerNotFoundError } from '../../api-errors/CustomerNotFoundError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { RequestDTO as SaveRequestDTO } from '../save-customer/usecase';

type RequestDTO = SaveRequestDTO & {
    id: string;
};

export class UpdateCustomerByIdUseCase {
    constructor(private customersRepository: ICustomersRepository) {}

    async execute({ id, ...rest }: RequestDTO): Promise<Customer> {
        let customer = await this.customersRepository.findById(id);
        if (!customer) throw new CustomerNotFoundError();

        const updatedCustomer = Customer.create(rest, id);

        await this.customersRepository.update(updatedCustomer);
        return updatedCustomer;
    }
}
