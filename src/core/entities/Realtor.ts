import { Entity } from '../domain/Entity';
import { RealtorStatus, Role } from '../enums';
import { Address } from '../types';

export type Props = {
    address?: Address;
    creci?: string;
    email: string;
    fullName: string;
    password: string;
    phone?: string;
    roles: Array<Role>;
    status: RealtorStatus;
    confirmationToken: string;
};

export class Realtor extends Entity<Props> {
    constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Realtor {
        return new Realtor(props, id);
    }
}
