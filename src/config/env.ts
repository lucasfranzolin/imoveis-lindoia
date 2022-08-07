import * as dotenv from 'dotenv';
import * as path from 'path';

function loadEnv(path: string) {
    console.log(`Loaded env from ${path}`);
    dotenv.config({ path });
}

export function setupEnv() {
    const isLambda = !!process.env.LAMBDA_TASK_ROOT;
    return isLambda
        ? console.log('Running with serverless environment!!')
        : loadEnv(path.join(process.cwd(), `.env.${process.env.NODE_ENV}`));
}

setupEnv();
