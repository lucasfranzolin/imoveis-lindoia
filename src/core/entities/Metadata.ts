import { Entity } from '../domain/Entity';

export type Props = {
    downloadUrl: string;
    fullPath: string;
};

export class Metadata extends Entity<Props> {
    private constructor(props: Props, id?: string) {
        super(props, id);
    }

    static create(props: Props, id?: string): Metadata {
        const metadata = new Metadata(props, id);
        return metadata;
    }
}
