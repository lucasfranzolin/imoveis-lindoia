import { Entity } from '../domain/Entity';
import { Price, Address } from '../types';
import { PropertyPurposeEnum, PropertyTypeEnum } from '../enums';

export type Props = {
    address: Address;
    ownerId: string;
    purpose: PropertyPurposeEnum;
    rent: Price;
    sale: Price;
    type: PropertyTypeEnum;
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
