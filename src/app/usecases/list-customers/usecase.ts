import { Pagination, PaginationResult } from '../../../core/types';
import {
    Customer,
    Props as CustomerProps,
} from '../../../core/entities/Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { IPaginationProvider } from '../../providers/interfaces/IPaginationProvider';

export type RequestDTO = Pagination<CustomerProps>;

type ResponseDTO = Promise<PaginationResult<Customer>>;

export class ListCustomersUseCase {
    constructor(
        private customersRepository: ICustomersRepository,
        private paginationProvider: IPaginationProvider
    ) {}

    async execute(params: RequestDTO): ResponseDTO {
        const query = this.paginationProvider.validate<CustomerProps>(params, [
            'fullName',
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
