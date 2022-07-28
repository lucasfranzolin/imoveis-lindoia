import { PropertyPurposeEnum } from '../../../core/enums';

export class GetPropertyPurposesUseCase {
    constructor() {}

    async execute(): Promise<Array<string>> {
        return Object.values(PropertyPurposeEnum);
    }
}
