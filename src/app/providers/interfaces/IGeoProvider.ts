import { GeoType } from '../../../core/enums';
import { PointCoordinates } from '../../../core/types';

export interface IGeoProvider {
    createPoint(coordinates: PointCoordinates): {
        type: GeoType;
        coordinates: PointCoordinates;
    };
}
