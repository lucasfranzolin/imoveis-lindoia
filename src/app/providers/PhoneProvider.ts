import { IPhoneProvider } from './interfaces/IPhoneProvider';

export class PhoneProvider implements IPhoneProvider {
    format(phoneNumber: string): string {
        return phoneNumber.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }

    validate(phoneNumber: string): boolean {
        return /^\d{11}$/.test(phoneNumber);
    }
}
