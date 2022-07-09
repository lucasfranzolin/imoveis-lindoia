import { Realtor } from '../../../core/entities/Realtor';

export interface ITokenProvider {
    calcExpireTime(): number;
    generate(realtor: Realtor): string;
    isExpired(expiresIn: number): boolean;
}
