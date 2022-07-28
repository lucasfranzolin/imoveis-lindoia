import httpStatus from 'http-status';
import { Property } from '../../../core/entities/Property';
import { PropertyPurposeEnum, PropertyTypeEnum } from '../../../core/enums';
import { Address, Price } from '../../../core/types';
import { ApiError } from '../../ApiError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';

type RequestDTO = {
    address: Address;
    ownerId: string;
    purpose: PropertyPurposeEnum;
    rent: Price;
    sale: Price;
    type: PropertyTypeEnum;
    registry: string;
};

export class SavePropertyUseCase {
    constructor(
        private propertiesRepository: IPropertiesRepository,
        private customersRepository: ICustomersRepository
    ) {}

    async execute(data: RequestDTO): Promise<Property> {
        if (!/^[0-9]+$/.test(data.address.number)) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                `O número '${data.address.number}' no endereço do imóvel é inválido.`
            );
        }

        const validPurposes = Object.values(PropertyPurposeEnum);
        if (!validPurposes.includes(data.purpose)) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                `Propósito '${
                    data.purpose
                }' inválido. Opções válidas: ${validPurposes.join(', ')}.`
            );
        }

        const validTypes = Object.values(PropertyTypeEnum);
        if (!validTypes.includes(data.type)) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                `Tipo '${
                    data.type
                }' inválido. Opções válidas: ${validTypes.join(', ')}.`
            );
        }

        if (
            (data.rent.isAnnounced && data.rent.value <= 0) ||
            (data.sale.isAnnounced && data.sale.value <= 0)
        ) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Ao anunciar um imóvel para venda ou locação o valor anunciado deve ser maior do que 0.'
            );
        }

        if (!/^[0-9]+$/.test(data.registry)) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'O número de matrícula deve conter apenas números.'
            );
        }

        const owner = await this.customersRepository.findById(data.ownerId);
        if (!owner) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                'O proprietário do imóvel não foi encontrado.'
            );
        }

        const newProperty = Property.create(data);
        await this.propertiesRepository.save(newProperty);
        return newProperty;
    }
}
