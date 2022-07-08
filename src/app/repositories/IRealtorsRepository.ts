import { Realtor } from '../../core/entities/Realtor';

export interface IRealtorsRepository {
    findByEmail(email: string): Promise<Realtor | null>;
    findById(realtorId: string): Promise<Realtor | null>;
    save(realtor: Realtor): Promise<void>;
}
