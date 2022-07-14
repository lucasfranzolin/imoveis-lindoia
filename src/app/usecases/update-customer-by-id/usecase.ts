import httpStatus from 'http-status';
import { Customer } from '../../../core/entities/Customer';
import { ApiError } from '../../ApiError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

type RequestDTO = {
    id: string;
    email: string;
    fullName: string;
    phone: string;
};

type ResponseDTO = Promise<Customer>;

export class UpdateCustomerByIdUseCase {
    constructor(private customersRepository: ICustomersRepository) {}

    async execute({ id, ...rest }: RequestDTO): ResponseDTO {
        let customer = await this.customersRepository.findById(id);
        if (!customer) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Cliente não encontrado.');
        }
        customer = await this.customersRepository.updateById(id, rest);
        return customer;
    }
}
