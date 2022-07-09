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

export type Pagination<T> = {
    limit: number;
    order: 1 | -1;
    page: number;
    sortBy?: keyof T;
};
