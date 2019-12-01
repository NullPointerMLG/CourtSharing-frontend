import React, { useContext, useState, useEffect } from "react";
import { GeoJsonObject } from "geojson";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import L, { LatLngExpression, icon, Layer, IconOptions, Icon } from "leaflet";
import { makeStyles, Theme } from "@material-ui/core";
import { SelectedSportContext } from "../../../context/SportsContext";
import { getCourts } from "../../../services/API";

const useStyle = makeStyles((theme: Theme) => ({
  map: {
    margin: "0px 50px 50px 50px",
    width: "100%"
  }
}));

export const CourtMap = () => {
  const classes = useStyle();
  const position: LatLngExpression = [36.72354892, -4.427047];
  const [selectedSport] = useContext(SelectedSportContext);
  const [geoJson, setGeoJson] = useState<GeoJsonObject>();
  const sportIcon: Icon<IconOptions> | undefined = selectedSport
    ? icon({
        iconUrl: selectedSport.marker_url,
        iconSize: [25, 25]
      })
    : undefined;

  useEffect(() => {
    getCourts(selectedSport._id.$oid)
    .then(res => setGeoJson(res))
    .catch(e => console.warn(e));
  }, [selectedSport])


  const onEachFeature = (feature: any, layer: Layer) => {
    if (feature.properties) {
      layer.bindPopup(feature.properties.NOMBRE);
    }
  };

  const pointToLayer = (feature: any, latlng: any) => {
    return L.marker(latlng, { icon: sportIcon }); // Change the icon to a custom icon
  };

  return (
    <div>
      {" "}
      {geoJson && selectedSport && (
        <div className={classes.map}>
          <Map center={position} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON
              key="hash(geoJson)"
              data={geoJson}
              icon={sportIcon}
              pointToLayer={pointToLayer}
              onEachFeature={onEachFeature}
            />
          </Map>
        </div>
      )}{" "}
    </div>
  );
};
