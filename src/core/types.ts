export type Address = {
    state: string;
    city: string;
    street: string;
    number: string;
    zip: string;
    complement?: string;
};

export type Schedule = {
    from: Date;
    to: Date;
};

export type DealMediation = {
    customerId: string;
    propertyId: string;
    realtorId: string;
};

export type Note = {
    changeAgent: string;
    content: string;
    createdAt: Date;
};

export type Price = {
    isAnnounced: boolean;
    range: [min: number, max: number];
    value: number;
};

export enum DealType {
    SALE = 'SALE',
    RENT = 'RENT',
}

export enum PropertyPurpose {
    BUSINESS = 'BUSINESS',
    HOME = 'HOME',
}

export enum PropertyType {
    APARTMENT = 'APARTMENT',
    FARM = 'FARM',
    FLOOR = 'FLOOR',
    HOTEL = 'HOTEL',
    HOUSE = 'HOUSE',
    LAND = 'LAND',
    ROOM = 'ROOM',
    SET = 'SET',
}

export type Pagination<T> = {
    limit: number;
    order: 1 | -1;
    page: number;
    sortBy: keyof T;
};
