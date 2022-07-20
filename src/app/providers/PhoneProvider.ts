import { IPhoneProvider } from './interfaces/IPhoneProvider';

export class PhoneProvider implements IPhoneProvider {
    validate(phoneNumber: string): never | void {}
}
