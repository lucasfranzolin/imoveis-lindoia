import { mongo } from '../../../config/mongo';
import { Session } from '../../../core/entities/Session';
import { IMongoDataService } from '../../services/interfaces/IMongoDataService';
import { MongoDataService } from '../../services/MongoDataService';
import { ISessionsRepository } from '../ISessionsRepository';

export class SessionsRepository implements ISessionsRepository {
    private readonly collection = 'sessions';
    private mongoDataService: IMongoDataService;

    constructor() {
        this.mongoDataService = new MongoDataService();
    }

    async get(refreshToken: string): Promise<Session | null> {
        const filter = { 'props.refreshToken': refreshToken };
        return await this.mongoDataService.findOne<Session>(
            this.collection,
            filter
        );
    }

    async save(session: Session): Promise<void> {
        await this.mongoDataService.insertOne<Session>(
            this.collection,
            session
        );
    }

    async delete(session: Session): Promise<void> {
        const filter = { uuid: session.id };
        await this.mongoDataService.deleteOne<Session>(this.collection, filter);
    }
}
