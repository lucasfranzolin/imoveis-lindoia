import { mongo } from '../../../config/mongo';
import { Realtor } from '../../../core/entities/Realtor';
import { IRealtorsRepository } from '../IRealtorsRepository';

export class RealtorsRepository implements IRealtorsRepository {
    private readonly collection = 'realtors';

    async findByEmail(email: string): Promise<Realtor | null> {
        const filter = { 'props.email': email };
        const doc = await (await mongo.getDb())
            .collection(this.collection)
            .findOne(filter);
        if (!doc) return null;
        return new Realtor(doc.props, doc.uuid);
    }

    async findById(realtorId: string): Promise<Realtor | null> {
        const filter = { uuid: realtorId };
        const doc = await (await mongo.getDb())
            .collection(this.collection)
            .findOne(filter);
        if (!doc) return null;
        return new Realtor(doc.props, doc.uuid);
    }

    async findByConfirmationToken(
        confirmationToken: string
    ): Promise<Realtor | null> {
        const filter = { 'props.confirmationToken': confirmationToken };
        const doc = await (await mongo.getDb())
            .collection(this.collection)
            .findOne(filter);
        if (!doc) return null;
        return new Realtor(doc.props, doc.uuid);
    }

    async save(realtor: Realtor): Promise<void> {
        await (await mongo.getDb())
            .collection(this.collection)
            .insertOne({ ...realtor });
    }

    async update(realtor: Realtor): Promise<void> {
        const filter = { uuid: realtor.id };
        await (await mongo.getDb())
            .collection(this.collection)
            .updateOne(filter, {
                $set: {
                    props: realtor.props,
                },
            });
    }
}
