import dotenv from 'dotenv';
import path from 'path';

let processEnv: dotenv.DotenvConfigOutput;

const init = (path: string) => {
    console.log(`Loaded env from ${path}`);
    processEnv = dotenv.config({ path });
};

export const setupEnv = () =>
    processEnv ??
    init(path.join(process.cwd(), `.env.${process.env.NODE_ENV}`));

setupEnv();
