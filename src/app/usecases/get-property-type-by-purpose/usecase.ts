import { PropertyPurposeEnum, PropertyTypeEnum } from '../../../core/enums';
import { propertyTypesByPurpose } from '../../../core/maps/propertyTypesByPurpose';

type RequestDTO = {
    purpose: PropertyPurposeEnum;
};

export class GetPropertyTypeByPurposeUseCase {
    constructor() {}

    async execute({ purpose }: RequestDTO): Promise<Array<PropertyTypeEnum>> {
        return propertyTypesByPurpose[purpose];
    }
}
