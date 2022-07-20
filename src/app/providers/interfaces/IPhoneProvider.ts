export interface IPhoneProvider {
    validate(phoneNumber: string): never | void;
}
