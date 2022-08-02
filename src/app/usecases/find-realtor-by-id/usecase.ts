import { Realtor } from '../../../core/entities/Realtor';
import { RealtorNotFoundError } from '../../api-errors/RealtorNotFoundError';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    realtorId: string;
};

export class FindRealtorByIdUseCase {
    constructor(private realtorsRepository: IRealtorsRepository) {}

    async execute({ realtorId }: RequestDTO): Promise<Realtor> {
        const realtor = await this.realtorsRepository.findById(realtorId);
        if (!realtor) throw new RealtorNotFoundError();

        return realtor;
    }
}
