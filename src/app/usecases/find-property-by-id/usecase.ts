import httpStatus from 'http-status';
import { Property } from '../../../core/entities/Property';
import { ApiError } from '../../ApiError';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';

type RequestDTO = {
    id: string;
};

export class FindPropertyByIdUseCase {
    constructor(private propertiesRepository: IPropertiesRepository) {}

    async execute(data: RequestDTO): Promise<Property> {
        const property = await this.propertiesRepository.findById(data.id);
        if (!property) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Imóvel não encontrado.');
        }
        return property;
    }
}
