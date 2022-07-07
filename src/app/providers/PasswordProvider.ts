import { compare, hash } from 'bcryptjs';

import { IPasswordProvider } from './interfaces/IPasswordProvider';

export class PasswordProvider implements IPasswordProvider {
    async encode(password: string): Promise<string> {
        return await hash(password, 8);
    }

    async isMatch(str: string, hash: string): Promise<boolean> {
        return await compare(str, hash);
    }
}
