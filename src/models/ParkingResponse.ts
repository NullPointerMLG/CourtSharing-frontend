import { GeoJsonObject } from 'geojson';

export interface ParkingResponse {
    type: string,
    marker_url: string,
    data: GeoJsonObject,
    active?: boolean
}