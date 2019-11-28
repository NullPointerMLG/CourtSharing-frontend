import React from "react";
import { GeoJsonObject } from "geojson";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { makeStyles, Theme } from "@material-ui/core";

interface MapProps {
  courts: GeoJsonObject;
}

const useStyle = makeStyles((theme: Theme) => ({
  map: {
    margin: "0px 50px 50px 50px",
    width: "100%"
  }
}))

export const CourtMap = (props: MapProps) => {
  const classes = useStyle()
  const position: LatLngExpression = [36.72354892, -4.427047];
  console.log(props.courts)
  return (
    <div className={classes.map}>
      <Map center={position} zoom={10}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON key="hash(props.courts)" data={props.courts} />
      </Map>
    </div>
  );
};
