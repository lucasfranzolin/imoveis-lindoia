import { Property } from '../../core/entities/Property';

export interface IPropertiesRepository {
    findById(customerId: string): Promise<Property | null>;
    save(realtor: Property): Promise<void>;
}
