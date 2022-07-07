import { Entity } from '../../core/domain/Entity';
import { Schedule } from '../../core/domain/Schedule';
import { DealMediation, Note } from '../../core/types';

type Props = DealMediation & {
    schedule: Schedule;
    notes: Array<Note>;
};

export class Visit extends Entity<Props> {
    private constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Visit {
        const visit = new Visit(props, id);
        return visit;
    }
}
