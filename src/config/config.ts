import './env';

import Joi from 'joi';

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid('production', 'development', 'test')
            .required(),
        PORT: Joi.number().default(Number(process.env.PORT)).required(),
        AWS_S3_ACCESS_KEY: Joi.string()
            .default(process.env.AWS_S3_ACCESS_KEY)
            .required(),
        AWS_S3_SECRET_KEY: Joi.string()
            .default(process.env.AWS_S3_SECRET_KEY)
            .required(),
        AWS_S3_BUCKET_REGION: Joi.string()
            .default(process.env.AWS_S3_BUCKET_REGION)
            .required(),
        AWS_S3_BUCKET_NAME: Joi.string()
            .default(process.env.AWS_S3_BUCKET_NAME)
            .required(),
        MONGO_USER: Joi.string().default(process.env.MONGO_USER).required(),
        MONGO_PASSWORD: Joi.string()
            .default(process.env.MONGO_PASSWORD)
            .required(),
        MONGO_CLUSTER_NAME: Joi.string()
            .default(process.env.MONGO_CLUSTER_NAME)
            .required(),
        MONGO_DB_NAME: Joi.string()
            .default(process.env.MONGO_DB_NAME)
            .required(),
        JWT_SECRET: Joi.string().default(process.env.JWT_SECRET).required(),
        JWT_TOKEN_DURATION_IN_MINUTES: Joi.number()
            .default(Number(process.env.JWT_TOKEN_DURATION_IN_MINUTES))
            .required(),
        JWT_REFRESH_DURATION_IN_DAYS: Joi.number()
            .default(Number(process.env.JWT_REFRESH_DURATION_IN_DAYS))
            .required(),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    aws: {
        s3: {
            accessKey: envVars.AWS_S3_ACCESS_KEY,
            secretKey: envVars.AWS_S3_SECRET_KEY,
            bucketRegion: envVars.AWS_S3_BUCKET_REGION,
            bucketName: envVars.AWS_S3_BUCKET_NAME,
        },
    },
    mongo: {
        url: `mongodb+srv://${envVars.MONGO_USER}:${envVars.MONGO_PASSWORD}@${envVars.MONGO_CLUSTER_NAME}.sl2p2.mongodb.net`,
        dbName: envVars.MONGO_DB_NAME,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        tokenExpiresIn: envVars.JWT_TOKEN_DURATION_IN_MINUTES,
        refreshExpiresIn: envVars.JWT_REFRESH_DURATION_IN_DAYS,
    },
};
