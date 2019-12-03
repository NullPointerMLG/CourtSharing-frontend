import React from "react";
import { GeoJsonObject } from "geojson";
import {
  Map as MapLeaflet,
  TileLayer,
  GeoJSON,
  Marker,
  Popup
} from "react-leaflet";
import L, {
  LatLngExpression,
  icon,
  Layer,
  IconOptions,
  Icon,
  Content
} from "leaflet";
import { usePosition } from "use-position";
import { Sport } from "./../../models/Sport";

const MLG_DEFAULT_LOCATION: LatLngExpression = [36.72354892, -4.427047];

const isNearMalaga = (latitude: number, longitude: number): boolean => {
  return (
    Math.abs(latitude - MLG_DEFAULT_LOCATION[0]) < 1 &&
    Math.abs(longitude - MLG_DEFAULT_LOCATION[1]) < 1
  );
};

interface Props {
  sport: Sport;
  court: GeoJsonObject;
}

export const Map: React.FC<Props> = props => {
  const { latitude, longitude } = usePosition();
  const position: LatLngExpression =
    latitude && longitude && isNearMalaga(latitude, longitude)
      ? [latitude, longitude]
      : MLG_DEFAULT_LOCATION;
  const sportIcon: Icon<IconOptions> | undefined =
    props.sport && props.sport.marker_url
      ? icon({
          iconUrl: props.sport.marker_url,
          iconSize: [25, 25]
        })
      : undefined;

  const sportLayer = (feature: any, latlng: any) => {
    return L.marker(latlng, { icon: sportIcon });
  };

  const onEachFeature = (feature: any, layer: Layer) => {
    if (feature.properties) {
      const popup: Content = feature.properties.NOMBRE;
      layer.bindPopup(popup);
    }
  };

  return (
    <div>
      <MapLeaflet center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          key={props.court.toString()}
          data={props.court}
          icon={sportIcon}
          pointToLayer={sportLayer}
          onEachFeature={onEachFeature}
        />
        {latitude && longitude && isNearMalaga(latitude, longitude) && (
          <Marker position={position}>
            <Popup>This is your location</Popup>
          </Marker>
        )}
      </MapLeaflet>
    </div>
  );
};
