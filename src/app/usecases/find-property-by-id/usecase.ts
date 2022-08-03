import { Property } from '../../../core/entities/Property';
import { PropertyOwnerNotFoundError } from '../../api-errors/PropertyOwnerNotFoundError';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';

type RequestDTO = {
    id: string;
};

export class FindPropertyByIdUseCase {
    constructor(private propertiesRepository: IPropertiesRepository) {}

    async execute({ id }: RequestDTO): Promise<Property> {
        const property = await this.propertiesRepository.findById(id);
        if (!property) throw new PropertyOwnerNotFoundError();

        return property;
    }
}
