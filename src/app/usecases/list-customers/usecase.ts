import { Pagination, PaginationResult } from '../../../core/types';
import {
    Customer,
    Props as CustomerProps,
} from '../../../core/entities/Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { IPaginationProvider } from '../../providers/interfaces/IPaginationProvider';

export type RequestDTO = Pagination<CustomerProps>;

export class ListCustomersUseCase {
    constructor(
        private customersRepository: ICustomersRepository,
        private paginationProvider: IPaginationProvider
    ) {}

    async execute(params: RequestDTO): Promise<PaginationResult<Customer>> {
        const query = this.paginationProvider.validate<CustomerProps>(params, [
            'fullName',
            'email',
            'phone',
        ]);
        const docs = await this.customersRepository.list(query);
        const count = await this.customersRepository.count();
        const candidatePages = Math.ceil(count / params.limit);
        const pages = candidatePages === 0 ? 1 : candidatePages;
        return {
            docs,
            pages,
            count,
        };
    }
}
