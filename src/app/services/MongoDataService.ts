import { Filter, UpdateFilter } from 'mongodb';
import { config } from '../../config/config';
import { HttpClient } from '../utils/HttpClient';
import { IMongoDataService } from './interfaces/IMongoDataService';

export class MongoDataService extends HttpClient implements IMongoDataService {
    private dataSource: string;
    private database: string;

    constructor(
        dataSource: string = config.mongo.dataSource,
        database: string = config.mongo.database
    ) {
        super({
            baseURL: config.mongo.baseURL,
            headers: {
                'Content-Type': 'application/json',
                'api-key': config.mongo.apiKey,
            },
        });
        this.dataSource = dataSource;
        this.database = database;
    }

    async aggregate(
        collection: string,
        pipeline: Array<Object>
    ): Promise<Array<any>> {
        const { data } = await this.http.post('/data/v1/action/aggregate', {
            dataSource: this.dataSource,
            database: this.database,
            collection,
            pipeline,
        });
        return data;
    }

    async countDocuments(collection: string): Promise<number> {
        const { data } = await this.http.post<{ total: number }>(
            '/countDocuments',
            { collection }
        );
        return data.total;
    }

    async deleteOne<T>(collection: string, filter: Filter<T>): Promise<void> {
        await this.http.post('/data/v1/action/deleteOne', {
            dataSource: this.dataSource,
            database: this.database,
            collection,
            filter,
        });
    }

    async find<T>(
        collection: string,
        filter: Filter<T>,
        projection: Object = {},
        sort: Object = {},
        limit: number = 1000,
        skip: number = 0
    ): Promise<Array<T>> {
        const { data } = await this.http.post('/data/v1/action/find', {
            dataSource: this.dataSource,
            database: this.database,
            collection,
            filter,
            projection,
            sort,
            limit,
            skip,
        });
        return data.documents;
    }

    async findOne<T>(collection: string, filter: Filter<T>): Promise<T | null> {
        const { data } = await this.http.post('/data/v1/action/findOne', {
            dataSource: this.dataSource,
            database: this.database,
            collection,
            filter,
        });
        if (!data) return null;
        return data;
    }

    async insertOne<T>(collection: string, document: T): Promise<void> {
        await this.http.post('/data/v1/action/insertOne', {
            dataSource: this.dataSource,
            database: this.database,
            collection,
            document,
        });
    }

    async updateOne<T>(
        collection: string,
        filter: Filter<T>,
        update: UpdateFilter<T>
    ): Promise<void> {
        await this.http.post('/data/v1/action/updateOne', {
            dataSource: this.dataSource,
            database: this.database,
            collection,
            filter,
            update,
        });
    }
}
