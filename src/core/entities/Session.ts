import { Entity } from '../domain/Entity';

type Props = {
    email: string;
    refreshToken: string;
};

export class Session extends Entity<Props> {
    constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Session {
        return new Session(props, id);
    }
}
