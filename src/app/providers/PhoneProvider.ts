import { IPhoneProvider } from './interfaces/IPhoneProvider';

export class PhoneProvider implements IPhoneProvider {
    format(phoneNumber: string): string {
        return phoneNumber.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }

    /**
     * @throws {Error}
     */
    validate(phoneNumber: string): never | void {
        if (!/^\d{11}$/.test(phoneNumber)) {
            throw new Error('Telefone inválido.');
        }
    }
}
