import { Property } from '../../../core/entities/Property';
import { GeoType } from '../../../core/enums';
import { PropertyNotFoundError } from '../../api-errors/PropertyNotFoundError';
import { PropertyOwnerNotFoundError } from '../../api-errors/PropertyOwnerNotFoundError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';
import { RequestDTO as SaveRequestDTO } from '../save-property/usecase';

type RequestDTO = SaveRequestDTO & {
    id: string;
};

export class UpdateProperyByIdUseCase {
    constructor(
        private propertiesRepository: IPropertiesRepository,
        private customersRepository: ICustomersRepository
    ) {}

    async execute({ id, ...data }: RequestDTO): Promise<Property> {
        const { ownerId, coordinates, ...rest } = data;

        const property = await this.propertiesRepository.findById(id);
        if (!property) throw new PropertyNotFoundError();

        const owner = await this.customersRepository.findById(ownerId);
        if (!owner) throw new PropertyOwnerNotFoundError();

        const updatedProperty = Property.create(
            {
                ...rest,
                ownerId,
                location: {
                    type: GeoType.POINT,
                    coordinates,
                },
            },
            id
        );

        await this.propertiesRepository.update(updatedProperty);
        return updatedProperty;
    }
}
