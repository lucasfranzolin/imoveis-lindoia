import { Property, Props as PropertyProps } from '../../core/entities/Property';
import { Pagination } from '../../core/types';

export interface IPropertiesRepository {
    count(): Promise<number>;
    deleteById(propertyId: string): Promise<void>;
    findById(propertyId: string): Promise<Property | null>;
    save(property: Property): Promise<void>;
    list({
        limit,
        order,
        page,
        sortBy,
    }: Pagination<PropertyProps>): Promise<Array<Property>>;
    update(property: Property): Promise<void>;
    findByOwnerId(ownerId: string): Promise<Array<Property>>;
}
