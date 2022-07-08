import { IRealtorsRepository } from '../../app/repositories/IRealtorsRepository';
import { Realtor } from '../../core/entities/Realtor';

export class InMemoryRealtorsRepository implements IRealtorsRepository {
    public items: Realtor[] = [];

    async findByEmail(email: string): Promise<Realtor | null> {
        const realtor = this.items.find(
            (realtor) => realtor.props.email === email
        );
        if (!realtor) return null;
        return realtor;
    }

    async findById(realtorId: string): Promise<Realtor | null> {
        const realtor = this.items.find((realtor) => realtor.id === realtorId);
        if (!realtor) return null;
        return realtor;
    }

    async save(realtor: Realtor): Promise<void> {
        this.items.push(realtor);
    }
}
