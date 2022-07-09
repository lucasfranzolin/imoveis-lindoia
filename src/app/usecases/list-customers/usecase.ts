import { Pagination } from '../../../core/types';
import {
    Customer,
    Props as CustomerProps,
} from '../../../core/entities/Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { IPaginationProvider } from '../../providers/interfaces/IPaginationProvider';

export type RequestDTO = Pagination<CustomerProps>;

type ResponseDTO = Promise<Array<Customer>>;

export class ListCustomersUseCase {
    constructor(
        private customersRepository: ICustomersRepository,
        private paginationProvider: IPaginationProvider
    ) {}

    async execute(params: RequestDTO): ResponseDTO {
        const query = this.paginationProvider.validate<CustomerProps>(params, [
            'fullName',
        ]);
        return await this.customersRepository.list(query);
    }
}
