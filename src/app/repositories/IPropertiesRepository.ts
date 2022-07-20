import { Property } from '../../core/entities/Property';

export interface IPropertiesRepository {
    save(realtor: Property): Promise<void>;
}
