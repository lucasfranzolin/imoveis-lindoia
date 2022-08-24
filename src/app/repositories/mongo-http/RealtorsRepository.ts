import { mongo } from '../../../config/mongo';
import { Realtor } from '../../../core/entities/Realtor';
import { IMongoDataService } from '../../services/interfaces/IMongoDataService';
import { MongoDataService } from '../../services/MongoDataService';
import { IRealtorsRepository } from '../IRealtorsRepository';

export class RealtorsRepository implements IRealtorsRepository {
    private readonly collection = 'realtors';
    private mongoDataService: IMongoDataService;

    constructor() {
        this.mongoDataService = new MongoDataService();
    }

    async findByEmail(email: string): Promise<Realtor | null> {
        const filter = { 'props.email': email };
        return await this.mongoDataService.findOne<Realtor>(
            this.collection,
            filter
        );
    }

    async findById(realtorId: string): Promise<Realtor | null> {
        const filter = { uuid: realtorId };
        return await this.mongoDataService.findOne<Realtor>(
            this.collection,
            filter
        );
    }

    async findByConfirmationToken(
        confirmationToken: string
    ): Promise<Realtor | null> {
        const filter = { 'props.confirmationToken': confirmationToken };
        return await this.mongoDataService.findOne<Realtor>(
            this.collection,
            filter
        );
    }

    async save(realtor: Realtor): Promise<void> {
        await this.mongoDataService.insertOne<Realtor>(
            this.collection,
            realtor
        );
    }

    async update(realtor: Realtor): Promise<void> {
        const filter = { uuid: realtor.id };
        await this.mongoDataService.updateOne<Realtor>(
            this.collection,
            filter,
            {
                $set: {
                    props: realtor.props,
                },
            }
        );
    }
}
