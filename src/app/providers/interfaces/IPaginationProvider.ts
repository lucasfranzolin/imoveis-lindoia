import { Pagination } from '../../../core/types';

export interface IPaginationProvider {
    validate<T>(
        params: Pagination<T>,
        allowedSortBy: Array<keyof T>
    ): Pagination<T> | never;
}
