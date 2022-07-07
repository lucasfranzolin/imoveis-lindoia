export interface IPasswordProvider {
    encode(password: string): Promise<string>;
    isMatch(str: string, hash: string): Promise<boolean>;
}
