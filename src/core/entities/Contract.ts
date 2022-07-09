import { Entity } from '../domain/Entity';
import { DealMediation } from '../types';
import { DealEnum } from '../enums';

export type Props = DealMediation & {
    DealEnum: DealEnum;
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
