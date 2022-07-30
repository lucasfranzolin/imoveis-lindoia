import { Property, Props as PropertyProps } from '../../core/entities/Property';
import { Pagination } from '../../core/types';

export interface IPropertiesRepository {
    count(): Promise<number>;
    findById(customerId: string): Promise<Property | null>;
    save(realtor: Property): Promise<void>;
    list({
        limit,
        order,
        page,
        sortBy,
    }: Pagination<PropertyProps>): Promise<Array<Property>>;
}
