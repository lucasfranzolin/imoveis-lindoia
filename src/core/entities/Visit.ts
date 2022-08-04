import { Entity } from '../domain/Entity';
import { DealMediation, Note, Schedule } from '../types';

export type Props = DealMediation & {
    schedule: Schedule;
    notes: Array<Note>;
};

export class Visit extends Entity<Props> {
    constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Visit {
        const visit = new Visit(props, id);
        return visit;
    }
}
