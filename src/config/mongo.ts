import { Db, MongoClient } from 'mongodb';

import { config } from './config';

let cached: Db | null;
let cachedClient: MongoClient | null;

const getDb = async (): Promise<Db> => {
    if (cached) return cached;
    if (!cachedClient) {
        cachedClient = await new MongoClient(config.mongo.url).connect();
    }
    cached = cachedClient.db();
    return cached;
};

const disconnect = async () => {
    if (cachedClient) await cachedClient.close();
    cachedClient = null;
    cached = null;
};

export const mongo = {
    getDb,
    disconnect,
};
