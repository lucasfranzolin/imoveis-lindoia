import httpStatus from 'http-status';
import { Customer } from '../../../core/entities/Customer';
import { ApiError } from '../../ApiError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

type RequestDTO = {
    id: string;
};

type ResponseDTO = Promise<Customer>;

export class FindCustomerByIdUseCase {
    constructor(private customersRepository: ICustomersRepository) {}

    async execute({ id }: RequestDTO): ResponseDTO {
        const customer = await this.customersRepository.findById(id);
        if (!customer) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Cliente não encontrado.');
        }
        return customer;
    }
}
