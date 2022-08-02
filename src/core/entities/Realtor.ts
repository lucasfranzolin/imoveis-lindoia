import { Address } from '../types';
import { Entity } from '../domain/Entity';
import { config } from '../../config/config';

export type Props = {
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
        const [, domain] = props.email.split('@');
        if (domain.toLowerCase() !== config.mail.domain) {
            throw new Error(`O domínio '${domain}' não é permitido.`);
        }

        return new Realtor(props, id);
    }
}
