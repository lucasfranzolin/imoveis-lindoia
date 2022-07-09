export interface IPasswordProvider {
    encode(password: string): Promise<string>;
    verify(str: string, hash: string): Promise<void> | never;
}
