import httpStatus from 'http-status';
import { Customer } from '../../../core/entities/Customer';
import { ApiError } from '../../ApiError';
import { IPhoneProvider } from '../../providers/interfaces/IPhoneProvider';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

export type RequestDTO = {
    email: string;
    fullName: string;
    phone: string;
    cpf: string;
};

export class SaveCustomerUseCase {
    constructor(
        private customersRepository: ICustomersRepository,
        private phoneProvider: IPhoneProvider
    ) {}

    async execute(data: RequestDTO): Promise<void> {
        this.phoneProvider.validate(data.phone);
        const customer = await this.customersRepository.findByEmail(data.email);
        if (customer) {
            throw new ApiError(
                httpStatus.CONFLICT,
                'O email fornecido já está em uso.'
            );
        }
        const newCustomer = Customer.create(data);
        await this.customersRepository.save(newCustomer);
    }
}
