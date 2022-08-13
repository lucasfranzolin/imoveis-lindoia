import { Pagination } from '../../core/types';
import { PaginationFirstPageError } from '../api-errors/PaginationFirstPageError';
import { PaginationMinLimitError } from '../api-errors/PaginationMinLimitError';
import { PaginationOrderError } from '../api-errors/PaginationOrderError';
import { PaginationSortError } from '../api-errors/PaginationSortError';
import { IPaginationProvider } from './interfaces/IPaginationProvider';

export class PaginationProvider implements IPaginationProvider {
    private minLimit: number = 10;
    private defaultOrder: 1 | -1 = 1;
    private firstPage: number = 0;

    calcPages(total: number, limit: number) {
        const candidatePages = Math.ceil(total / limit);
        const pages = candidatePages === 0 ? 1 : candidatePages;
        return pages;
    }

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
            throw new PaginationMinLimitError(this.minLimit);
        }

        if (![-1, 1].includes(Number(order))) {
            throw new PaginationOrderError([-1, 1]);
        }
        if (Number(page) < this.firstPage) {
            throw new PaginationFirstPageError(this.firstPage);
        }
        if (
            sortBy &&
            allowedSortBy.length > 0 &&
            !allowedSortBy.includes(sortBy)
        ) {
            throw new PaginationSortError(sortBy as string);
        }
        return {
            limit: Number(limit),
            order: Number(order) as any,
            page: Number(page),
            sortBy,
        };
    }
}
