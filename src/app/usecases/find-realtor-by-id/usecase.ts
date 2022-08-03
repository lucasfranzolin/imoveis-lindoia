import { Realtor } from '../../../core/entities/Realtor';
import { RealtorNotFoundError } from '../../api-errors/RealtorNotFoundError';
import { IRealtorsRepository } from '../../repositories/IRealtorsRepository';

type RequestDTO = {
    id: string;
};

export class FindRealtorByIdUseCase {
    constructor(private realtorsRepository: IRealtorsRepository) {}

    async execute({ id }: RequestDTO): Promise<Realtor> {
        const realtor = await this.realtorsRepository.findById(id);
        if (!realtor) throw new RealtorNotFoundError();

        return realtor;
    }
}
