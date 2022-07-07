import { Address } from '../../core/domain/Address';
import { Entity } from '../../core/domain/Entity';

type Props = {
    address?: Address;
    creci?: string;
    email: string;
    fullName?: string;
    password: string;
    phone?: string;
};

export class Realtor extends Entity<Props> {
    private constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Realtor {
        const realtor = new Realtor(props, id);
        return realtor;
    }
}
