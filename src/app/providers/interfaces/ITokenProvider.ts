export interface ITokenProvider {
    calcExpireTime(): number;
    generate(realtorID: string): string;
    isExpired(expiresIn: number): boolean;
}
