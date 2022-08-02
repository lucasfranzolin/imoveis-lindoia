import { CustomerNotFoundError } from '../../api-errors/CustomerNotFoundError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

type RequestDTO = {
    id: string;
};

export class DeleteCustomerByIdUseCase {
    constructor(private customersRepository: ICustomersRepository) {}

    async execute({ id }: RequestDTO): Promise<void> {
        const customer = await this.customersRepository.findById(id);
        if (!customer) throw new CustomerNotFoundError();

        await this.customersRepository.deleteById(id);
    }
}
