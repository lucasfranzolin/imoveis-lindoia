import Joi from 'joi';
import { setupEnv } from './env';

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid('production', 'development', 'test')
            .default(process.env.NODE_ENV),
        PORT: Joi.number().when('NODE_ENV', {
            is: 'production',
            then: Joi.number().default(80),
            otherwise: Joi.number().when('NODE_ENV', {
                is: 'development',
                then: Joi.number().default(4001),
                otherwise: Joi.number().default(4002),
            }),
        }),
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
        MAIL_NAME: Joi.string().default(process.env.MAIL_NAME).required(),
        MAIL_ADDRESS: Joi.string().default(process.env.MAIL_ADDRESS).required(),
        MAIL_HOST: Joi.string().default(process.env.MAIL_HOST).required(),
        MAIL_PORT: Joi.number()
            .default(Number(process.env.MAIL_PORT))
            .required(),
        MAIL_AUTH_USER: Joi.string()
            .default(process.env.MAIL_AUTH_USER)
            .required(),
        MAIL_AUTH_PASSWORD: Joi.string()
            .default(process.env.MAIL_AUTH_PASSWORD)
            .required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string()
            .default(process.env.JWT_ACCESS_TOKEN_SECRET)
            .required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string()
            .default(process.env.JWT_REFRESH_TOKEN_SECRET)
            .required(),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(setupEnv().parsed);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwt: {
        accessToken: {
            secret: envVars.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: 15 * 60, // 15 minutes
        },
        refreshToken: {
            secret: envVars.JWT_REFRESH_TOKEN_SECRET,
            expiresIn: 7 * 24 * 60 * 60, // 7 days
        },
    },
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
    mail: {
        domain: envVars.MAIL_ADDRESS.split('@')[1],
        name: envVars.MAIL_NAME,
        address: envVars.MAIL_ADDRESS,
        host: envVars.MAIL_HOST,
        port: envVars.MAIL_PORT,
        auth: {
            user: envVars.MAIL_AUTH_USER,
            password: envVars.MAIL_AUTH_PASSWORD,
        },
    },
};
