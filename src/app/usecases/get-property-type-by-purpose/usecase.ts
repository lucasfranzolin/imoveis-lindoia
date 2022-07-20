import { propertyTypesByPurpose } from '../../../core/maps/propertyTypesByPurpose';
import { PropertyPurposeEnum, PropertyTypeEnum } from '../../../core/enums';

type RequestDTO = {
    purpose: PropertyPurposeEnum;
};

type ResponseDTO = Promise<Array<PropertyTypeEnum>>;

export class GetPropertyTypeByPurposeUseCase {
    constructor() {}

    async execute({ purpose }: RequestDTO): ResponseDTO {
        return propertyTypesByPurpose[purpose];
    }
}
