import { Address } from '../../core/domain/Address';
import { Entity } from '../../core/domain/Entity';
import { Price, PropertyPurpose, PropertyType } from '../../core/types';

type Props = {
    address: Address;
    ownerId: string;
    purpose: PropertyPurpose;
    rent: Price;
    sale: Price;
    type: PropertyType;
};

export class Property extends Entity<Props> {
    private constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Property {
        const property = new Property(props, id);
        return property;
    }
}
