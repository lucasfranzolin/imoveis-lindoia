export class Address {
    public state: string;
    public city: string;
    public street: string;
    public number: string;
    public zip: string;
    public complement?: string;

    constructor(
        state: string,
        city: string,
        street: string,
        number: string,
        zip: string,
        complement?: string
    ) {
        this.state = state;
        this.city = city;
        this.street = street;
        this.number = number;
        this.zip = zip;
        this.complement = complement;
    }

    public toString(): string {
        return `${this.street}, ${this.number}${
            this.complement ? `, ${this.complement}` : ''
        }
        ${this.zip} ${this.city}, ${this.state}`;
    }
}
