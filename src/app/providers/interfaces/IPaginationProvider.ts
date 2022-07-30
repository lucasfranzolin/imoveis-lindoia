import { Pagination } from '../../../core/types';

export interface IPaginationProvider {
    calcPages(total: number, limit: number): number;
    validate<T>(
        params: Pagination<T>,
        allowedSortBy: Array<keyof T>
    ): Pagination<T> | never;
}
