// createIndex
// indexExists
// mongo.getDb().collections()

import { UpdateFilter, Filter } from 'mongodb';

export interface IMongoDataService {
    aggregate(collection: string, pipeline: Array<Object>): Promise<Array<any>>;
    countDocuments(collection: string): Promise<number>;
    deleteOne<T>(collection: string, filter: Filter<T>): Promise<void>;
    find<T>(
        collection: string,
        filter: Filter<T>,
        projection?: Object,
        sort?: Object,
        limit?: number,
        skip?: number
    ): Promise<Array<T>>;
    findOne<T>(collection: string, filter: Filter<T>): Promise<T | null>;
    insertOne<T>(collection: string, document: T): Promise<void>;
    updateOne<T>(
        collection: string,
        filter: Filter<T>,
        update: UpdateFilter<T>
    ): Promise<void>;
}
