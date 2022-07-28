import httpStatus from 'http-status';
import { Realtor } from '../../../core/entities/Realtor';
import { ApiError } from '../../ApiError';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    realtorId: string;
};

export class FindRealtorByIdUseCase {
    constructor(private realtorsRepository: IRealtorsRepository) {}

    async execute({ realtorId }: RequestDTO): Promise<Realtor> {
        const realtor = await this.realtorsRepository.findById(realtorId);
        if (!realtor) {
            throw new ApiError(
                httpStatus.NOT_FOUND,
                'Corretor não encontrado.'
            );
        }
        return realtor;
    }
}
