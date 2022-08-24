import { mongo } from '../../../config/mongo';
import {
    Property,
    Props as PropertyProps,
} from '../../../core/entities/Property';
import { Pagination } from '../../../core/types';
import { IMongoDataService } from '../../services/interfaces/IMongoDataService';
import { MongoDataService } from '../../services/MongoDataService';
import { IPropertiesRepository } from '../IPropertiesRepository';

export class PropertiesRepository implements IPropertiesRepository {
    private readonly collection = 'properties';
    private locationIndex: string = 'locationIndex';
    private locationIndexExists: boolean = false;
    private mongoDataService: IMongoDataService;

    constructor() {
        this.mongoDataService = new MongoDataService();
    }

    async count(): Promise<number> {
        return await this.mongoDataService.countDocuments(this.collection);
    }

    async deleteById(propertyId: string): Promise<void> {
        const filter = { uuid: propertyId };
        await this.mongoDataService.deleteOne<Property>(
            this.collection,
            filter
        );
    }

    async findById(customerId: string): Promise<Property | null> {
        const filter = { uuid: customerId };
        return await this.mongoDataService.findOne<Property>(
            this.collection,
            filter
        );
    }

    async save(property: Property): Promise<void> {
        await this.checkLocationIndex();
        await this.mongoDataService.insertOne<Property>(
            this.collection,
            property
        );
    }

    async list({
        limit,
        order,
        page,
        sortBy,
    }: Pagination<PropertyProps>): Promise<Array<Property>> {
        const agg = [
            { $skip: limit * page }, //
            { $limit: limit },
        ];
        if (sortBy) {
            const by = `props.${sortBy}`;
            agg.unshift({ $sort: { [by]: order } } as any);
        }
        return await this.mongoDataService.aggregate(this.collection, agg);
    }

    async update(property: Property): Promise<void> {
        const filter = { uuid: property.id };
        await this.mongoDataService.updateOne<Property>(
            this.collection,
            filter,
            {
                $set: {
                    props: property.props,
                },
            }
        );
    }

    async findByOwnerId(ownerId: string): Promise<Array<Property>> {
        const filter = { 'props.ownerId': ownerId };
        return await this.mongoDataService.find<Property>(
            this.collection,
            filter
        );
    }

    private async checkLocationIndex() {
        //
    }
}
