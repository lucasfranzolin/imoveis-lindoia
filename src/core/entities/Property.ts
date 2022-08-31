import { Entity } from '../domain/Entity';
import { PropertyPurposeEnum, PropertyTypeEnum } from '../enums';
import { Address, GeoJson, PointCoordinates,Price } from '../types';

export type Props = {
    address: Address;
    ownerId: string;
    purpose: PropertyPurposeEnum;
    rent: Price;
    sale: Price;
    type: PropertyTypeEnum;
    registry: string;
    location: GeoJson<PointCoordinates>;
};

export class Property extends Entity<Props> {
    constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Property {
        if (!/^[0-9]+$/.test(props.address.number)) {
            throw new Error(
                `O número '${props.address.number}' no endereço do imóvel é inválido.`
            );
        }

        const validPurposes = Object.values(PropertyPurposeEnum);
        if (!validPurposes.includes(props.purpose)) {
            throw new Error(
                `Propósito '${
                    props.purpose
                }' inválido. Opções válidas: ${validPurposes.join(', ')}.`
            );
        }

        const validTypes = Object.values(PropertyTypeEnum);
        if (!validTypes.includes(props.type)) {
            throw new Error(
                `Tipo '${
                    props.type
                }' inválido. Opções válidas: ${validTypes.join(', ')}.`
            );
        }

        if (
            (props.rent.isAnnounced && props.rent.value <= 0) ||
            (props.sale.isAnnounced && props.sale.value <= 0)
        ) {
            throw new Error(
                'Ao anunciar um imóvel para venda ou locação o valor anunciado deve ser maior do que 0.'
            );
        }

        if (!/^[0-9]+$/.test(props.registry)) {
            throw new Error(
                'O número de matrícula deve conter apenas números.'
            );
        }

        const minLng = -90.0;
        const maxLng = 90.0;
        const [lng, lat] = props.location.coordinates;
        if (lng < minLng || lng > maxLng) {
            throw new Error(
                `Longitude deve estar entre ${minLng} e ${maxLng}.`
            );
        }

        const minLat = -180.0;
        const maxLat = 180.0;
        if (lat < minLat || lat > maxLat) {
            throw new Error(`Latitude deve estar entre ${minLat} e ${maxLat}.`);
        }

        return new Property(props, id);
    }
}
