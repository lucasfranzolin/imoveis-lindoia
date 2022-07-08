import { Entity } from '../../core/domain/Entity';
import { DealMediation, DealType } from '../../core/types';

export type Props = DealMediation & {
    dealType: DealType;
    price: number;
    months?: number;
    createdAt: Date;
};

export class Contract extends Entity<Props> {
    private constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Contract {
        const contract = new Contract(props, id);
        return contract;
    }
}
