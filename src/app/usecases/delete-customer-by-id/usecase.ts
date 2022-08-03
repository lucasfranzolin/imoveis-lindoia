import { CustomerNotFoundError } from '../../api-errors/CustomerNotFoundError';
import { DeleteCustomerConflictError } from '../../api-errors/DeleteCustomerConflictError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';

type RequestDTO = {
    id: string;
};

export class DeleteCustomerByIdUseCase {
    constructor(
        private customersRepository: ICustomersRepository,
        private propertiesRepository: IPropertiesRepository
    ) {}

    async execute({ id }: RequestDTO): Promise<void> {
        const customer = await this.customersRepository.findById(id);
        if (!customer) throw new CustomerNotFoundError();

        const ownedProperties = await this.propertiesRepository.findByOwnerId(
            id
        );
        if (ownedProperties.length > 0) throw new DeleteCustomerConflictError();

        await this.customersRepository.deleteById(id);
    }
}
