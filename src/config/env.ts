import { config } from 'dotenv';
import path from 'path';

const filePath = path.join(__dirname, `../../.env.${process.env.NODE_ENV}`);

config({ path: filePath });
