import { IRealtorsRepository } from '../../app/repositories/IRealtorsRepository';
import { Realtor } from '../../core/entities/Realtor';

export class InMemoryRealtorsRepository implements IRealtorsRepository {
    public items: Array<Realtor> = [];

    async findByEmail(email: string): Promise<Realtor | null> {
        const realtor = this.items.find((item) => item.props.email === email);
        if (!realtor) return null;
        return realtor;
    }

    async findById(realtorId: string): Promise<Realtor | null> {
        const realtor = this.items.find((item) => item.id === realtorId);
        if (!realtor) return null;
        return realtor;
    }

    async save(realtor: Realtor): Promise<void> {
        this.items.push(realtor);
    }
}
