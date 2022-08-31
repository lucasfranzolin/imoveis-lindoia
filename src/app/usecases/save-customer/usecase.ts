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

    async execute({ email, ...rest }: RequestDTO): Promise<Customer> {
        const customer = await this.customersRepository.findByEmail(email);
        if (customer) throw new EmailAlreadyBeingUsedError(email);

        const newCustomer = Customer.create({
            email,
            ...rest,
        });

        await this.customersRepository.save(newCustomer);
        return newCustomer;
    }
}
