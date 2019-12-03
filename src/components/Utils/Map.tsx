import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
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
import AddIcon from "@material-ui/icons/Add";
import { usePosition } from "use-position";
import classnames from "classnames";
import { Sport } from "./../../models/Sport";

const DEFAULT_ICON_SIZE: [number, number] = [20, 20];
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
  const [selectedMarker, setSelectedMarker] = useState();
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
      layer.addEventListener("popupopen", () => {
        setSelectedMarker(feature);
      });
      layer.addEventListener("popupclose", () => {
        setSelectedMarker(undefined);
      });
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
      </MapLeaflet>
    </div>
  );
};
