import { PropertyPurposeEnum, PropertyTypeEnum } from '../enums';

export const propertyTypesByPurpose: {
    [key in PropertyPurposeEnum]: PropertyTypeEnum[];
} = {
    [PropertyPurposeEnum.BUSINESS]: [
        PropertyTypeEnum.FLOOR,
        PropertyTypeEnum.HOTEL,
        PropertyTypeEnum.ROOM,
    ],
    [PropertyPurposeEnum.HOME]: [
        PropertyTypeEnum.APARTMENT,
        PropertyTypeEnum.HOUSE,
    ],
};
