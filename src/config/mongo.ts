import { Db, MongoClient } from 'mongodb';

import { config } from './config';

let connection: MongoClient | null;

const connect = (url: string): Promise<MongoClient> => {
    if (!connection) {
        connection = new MongoClient(url);
    }
    return connection.connect();
};

const disconnect = async () => {
    if (connection) {
        await connection.close();
    }
    connection = null;
};

const getDb = (): Db => connection!.db(config.mongo.dbName);

export const mongo = {
    connect,
    disconnect,
    getDb,
};
