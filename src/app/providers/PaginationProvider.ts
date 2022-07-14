import httpStatus from 'http-status';
import { Pagination } from '../../core/types';
import { ApiError } from '../ApiError';
import { IPaginationProvider } from './interfaces/IPaginationProvider';

export class PaginationProvider implements IPaginationProvider {
    private minLimit: number = 10;
    private defaultOrder: 1 | -1 = 1;
    private firstPage: number = 0;

    validate<T>(
        {
            limit = this.minLimit,
            order = this.defaultOrder,
            page = this.firstPage,
            sortBy,
        }: Pagination<T>,
        allowedSortBy: Array<keyof T> = []
    ): Pagination<T> | never {
        if (Number(limit) < this.minLimit) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                `Valor de 'limit' deve ser no minimo ${this.minLimit}.`
            );
        }
        if (![-1, 1].includes(Number(order))) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                `O parametro 'order' é inválido, valores permitidos: 1 (ASC) ou -1 (DESC).`
            );
        }
        if (Number(page) < this.firstPage) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                `A primeira página sempre será a ${this.firstPage}.`
            );
        }
        if (
            sortBy &&
            allowedSortBy.length > 0 &&
            !allowedSortBy.includes(sortBy)
        ) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                `Não é possível ordernar por '${sortBy as string}'`
            );
        }
        return {
            limit: Number(limit),
            order: Number(order) as any,
            page: Number(page),
            sortBy,
        };
    }
}
