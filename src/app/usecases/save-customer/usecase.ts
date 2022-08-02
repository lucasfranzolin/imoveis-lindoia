import { Customer } from '../../../core/entities/Customer';
import { EmailAlreadyBeingUsedError } from '../../api-errors/EmailAlreadyBeingUsedError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

export type RequestDTO = {
    email: string;
    fullName: string;
    phone: string;
    cpf: string;
};

export class SaveCustomerUseCase {
    constructor(private customersRepository: ICustomersRepository) {}

    async execute(data: RequestDTO): Promise<void> {
        const customer = await this.customersRepository.findByEmail(data.email);
        if (customer) throw new EmailAlreadyBeingUsedError(data.email);

        const newCustomer = Customer.create(data);
        await this.customersRepository.save(newCustomer);
    }
}
