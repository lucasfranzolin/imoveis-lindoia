import { Entity } from '../../core/domain/Entity';

type Props = {
    expiresIn: number;
    realtorId: string;
};

export class Session extends Entity<Props> {
    private constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Session {
        const session = new Session(props, id);
        return session;
    }
}
