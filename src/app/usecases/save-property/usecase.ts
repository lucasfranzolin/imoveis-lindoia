import httpStatus from 'http-status';
import { Property } from '../../../core/entities/Property';
import {
    GeoType,
    PropertyPurposeEnum,
    PropertyTypeEnum,
} from '../../../core/enums';
import { Address, PointCoordinates, Price } from '../../../core/types';
import { ApiError } from '../../ApiError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';
import { PropertyOwnerNotFoundError } from '../../api-errors/PropertyOwnerNotFoundError';

export type RequestDTO = {
    address: Address;
    ownerId: string;
    purpose: PropertyPurposeEnum;
    rent: Price;
    sale: Price;
    type: PropertyTypeEnum;
    registry: string;
    coordinates: PointCoordinates;
};

export class SavePropertyUseCase {
    constructor(
        private propertiesRepository: IPropertiesRepository,
        private customersRepository: ICustomersRepository
    ) {}

    async execute({
        ownerId,
        coordinates,
        ...rest
    }: RequestDTO): Promise<Property> {
        const owner = await this.customersRepository.findById(ownerId);
        if (!owner) throw new PropertyOwnerNotFoundError();

        let newProperty: Property;
        try {
            newProperty = Property.create({
                ...rest,
                ownerId,
                location: {
                    type: GeoType.POINT,
                    coordinates,
                },
            });
        } catch (err) {
            throw new ApiError(httpStatus.BAD_REQUEST, err as string);
        }

        await this.propertiesRepository.save(newProperty);
        return newProperty;
    }
}
