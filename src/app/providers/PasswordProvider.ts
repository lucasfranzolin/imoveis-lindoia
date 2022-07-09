import { compare, hash } from 'bcryptjs';

import { IPasswordProvider } from './interfaces/IPasswordProvider';

export class PasswordProvider implements IPasswordProvider {
    async encode(password: string): Promise<string> {
        return await hash(password, 8);
    }

    async verify(str: string, hash: string): Promise<void> | never {
        const isValid = await compare(str, hash);
        if (!isValid) {
            throw new Error('As senhas não correspondem.');
        }
    }
}
