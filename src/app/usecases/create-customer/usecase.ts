import { Customer } from '../../../core/entities/Customer';
import { IPhoneProvider } from '../../providers/interfaces/IPhoneProvider';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

export type RequestDTO = {
    email: string;
    fullName: string;
    phone: string;
};

type ResponseDTO = Promise<void>;

export class CreateCustomerUseCase {
    constructor(
        private customersRepository: ICustomersRepository,
        private phoneProvider: IPhoneProvider
    ) {}

    async execute({ email, fullName, phone }: RequestDTO): ResponseDTO {
        const isPhoneValid = this.phoneProvider.validate(phone);
        if (!isPhoneValid) {
            throw new Error('Telefone inválido.');
        }
        const customer = await this.customersRepository.findByEmail(email);
        if (customer) {
            throw new Error('O email fornecido já está em uso.');
        }
        const newCustomer = Customer.create({
            email,
            fullName,
            phone,
        });
        await this.customersRepository.save(newCustomer);
    }
}
