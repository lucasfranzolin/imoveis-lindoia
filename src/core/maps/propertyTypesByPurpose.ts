import { PropertyPurpose, PropertyType } from '../types';

export const propertyTypesByPurpose: {
    [key in PropertyPurpose]: PropertyType[];
} = {
    [PropertyPurpose.BUSINESS]: [
        PropertyType.FLOOR,
        PropertyType.HOTEL,
        PropertyType.ROOM,
        PropertyType.SET,
    ],
    [PropertyPurpose.HOME]: [PropertyType.APARTMENT, PropertyType.HOUSE],
};
