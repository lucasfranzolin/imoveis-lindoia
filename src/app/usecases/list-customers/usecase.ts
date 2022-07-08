import { Pagination } from '../../../core/types';
import {
    Customer,
    Props as CustomerProps,
} from '../../../core/entities/Customer';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

export type RequestDTO = Pagination<CustomerProps>;

type ResponseDTO = Promise<Array<Customer>>;

export class ListCustomersUseCase {
    constructor(private customersRepository: ICustomersRepository) {}

    async execute(params: RequestDTO): ResponseDTO {
        const minLimit = 10;
        const defaultOrder = 1;
        const firstPage = 0;

        const {
            limit = minLimit,
            order = defaultOrder,
            page = firstPage,
            sortBy = 'fullName',
        } = params;

        if (limit < minLimit) {
            throw new Error(`Valor de 'limit' deve ser no minimo ${minLimit}.`);
        }
        if (![-1, 1].includes(order)) {
            throw new Error(
                `O parametro 'order' é inválido, valores permitidos: 1 (ASC) ou -1 (DESC).`
            );
        }
        if (page < firstPage) {
            throw new Error(`A primeira página sempre será a ${firstPage}.`);
        }
        // ! TODO: validate `sortBy`
        const customers = await this.customersRepository.list({
            limit,
            order,
            page,
            sortBy,
        });
        return customers;
    }
}
