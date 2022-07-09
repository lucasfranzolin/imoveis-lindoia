export interface IPhoneProvider {
    format(phoneNumber: string): string;
    validate(phoneNumber: string): never | void;
}
