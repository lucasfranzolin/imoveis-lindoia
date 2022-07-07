import crypto from 'crypto';

export abstract class Entity<T> {
    protected readonly uuid: string;
    public props: T;

    get id(): string {
        return this.uuid;
    }

    constructor(props: T, id?: string) {
        this.props = props;
        this.uuid = id ?? crypto.randomUUID();
    }
}
