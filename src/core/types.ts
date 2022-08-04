import { GeoType } from './enums';

export type Address = {
    state: string;
    city: string;
    district: string;
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
    value: number;
};

export type Pagination<T> = {
    limit: number;
    order: 1 | -1;
    page: number;
    sortBy?: keyof T;
};

export type PaginationResult<T> = {
    count: number;
    docs: Array<T>;
    pages: number;
};

export type PointCoordinates = [longitude: number, latitude: number];

export type GeoJson<T> = {
    type: GeoType;
    coordinates: T;
};

export type MediaPreview = {
    downloadUrl: string;
    index: number;
};
