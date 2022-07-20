import { PropertyPurposeEnum } from '../../../core/enums';

type ResponseDTO = Promise<Array<string>>;

export class GetPropertyPurposesUseCase {
    constructor() {}

    async execute(): ResponseDTO {
        return Object.values(PropertyPurposeEnum);
    }
}
