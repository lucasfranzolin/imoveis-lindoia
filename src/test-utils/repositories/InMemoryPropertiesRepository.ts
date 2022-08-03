import { IPropertiesRepository } from '../../app/repositories/IPropertiesRepository';
import { Property, Props as PropertyProps } from '../../core/entities/Property';
import { Pagination } from '../../core/types';

export class InMemoryPropertiesRepository implements IPropertiesRepository {
    public items: Array<Property> = [];

    async count(): Promise<number> {
        return this.items.length;
    }

    async deleteById(propertyId: string): Promise<void> {
        this.items = this.items.filter((item) => item.id !== propertyId);
    }

    async findById(propertyId: string): Promise<Property | null> {
        const property = this.items.find((item) => item.id === propertyId);
        if (!property) return null;
        return property;
    }

    async save(property: Property): Promise<void> {
        this.items.push(property);
    }

    async list({
        limit,
        order,
        page,
        sortBy,
    }: Pagination<PropertyProps>): Promise<Array<Property>> {
        return [];
    }

    async update(property: Property): Promise<void> {
        this.items = this.items.map((item) =>
            item.id === property.id ? property : item
        );
    }

    async findByOwnerId(ownerId: string): Promise<Array<Property>> {
        return this.items.filter((item) => item.props.ownerId === ownerId);
    }
}
