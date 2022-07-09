import { Entity } from '../domain/Entity';

export type Props = {
    email: string;
    fullName: string;
    phone: string;
};

export class Customer extends Entity<Props> {
    private constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Customer {
        const customer = new Customer(props, id);
        return customer;
    }
}
