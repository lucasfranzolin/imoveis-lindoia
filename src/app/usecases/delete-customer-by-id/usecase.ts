import httpStatus from 'http-status';
import { Customer } from '../../../core/entities/Customer';
import { ApiError } from '../../ApiError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

type RequestDTO = {
    id: string;
};

export class DeleteCustomerByIdUseCase {
    constructor(private customersRepository: ICustomersRepository) {}

    async execute({ id }: RequestDTO): Promise<void> {
        const customer = await this.customersRepository.findById(id);
        if (!customer) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Cliente não encontrado.');
        }
        await this.customersRepository.deleteById(id);
    }
}
