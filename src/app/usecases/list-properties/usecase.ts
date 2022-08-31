import {
    Property,
    Props as PropertyProps,
} from '../../../core/entities/Property';
import { Pagination, PaginationResult } from '../../../core/types';
import { IPaginationProvider } from '../../providers/interfaces/IPaginationProvider';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';

export type RequestDTO = Pagination<PropertyProps>;

export class ListPropertiesUseCase {
    constructor(
        private propertiesRepository: IPropertiesRepository,
        private paginationProvider: IPaginationProvider
    ) {}

    async execute(params: RequestDTO): Promise<PaginationResult<Property>> {
        const query = this.paginationProvider.validate<PropertyProps>(
            params,
            []
        );
        const docs = await this.propertiesRepository.list(query);
        const count = await this.propertiesRepository.count();
        const pages = this.paginationProvider.calcPages(count, params.limit);
        return {
            docs,
            pages,
            count,
        };
    }
}
