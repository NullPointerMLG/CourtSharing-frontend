import React, { useContext, useState, useEffect } from "react";
import { GeoJsonObject } from "geojson";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import L, {
  LatLngExpression,
  icon,
  Layer,
  IconOptions,
  Icon,
  Content
} from "leaflet";
import { makeStyles, Theme, Fab } from "@material-ui/core";
import { SelectedSportContext } from "../../../context/SportsContext";
import { getCourts } from "../../../services/API";
import AddIcon from "@material-ui/icons/Add";

const useStyle = makeStyles((theme: Theme) => ({
  mapContainer: {
    margin: "0px 50px 50px 50px",
    width: "100%",
    position: "relative"
  },
  addFab: {
    position: "absolute",
    margin: "10px",
    bottom: "0px",
    zIndex: 999,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  }
}));

interface CourtMapProps {
  onAddEventClick: any
}

export const CourtMap = (props: CourtMapProps) => {
  const classes = useStyle();
  const position: LatLngExpression = [36.72354892, -4.427047];
  const [selectedSport] = useContext(SelectedSportContext);
  const [geoJson, setGeoJson] = useState<GeoJsonObject>();
  const [selectedMarker, setSelectedMarker] = useState();
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
  }, [selectedSport]);

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

  const pointToLayer = (feature: any, latlng: any) => {
    return L.marker(latlng, { icon: sportIcon }); // Change the icon to a custom icon
  };

  return (
    <div>
      {geoJson && selectedSport && (
        <div className={classes.mapContainer}>
          {selectedMarker && (
            <Fab onClick={() => props.onAddEventClick(selectedMarker)} className={classes.addFab}>
              <AddIcon />
            </Fab>
          )}
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
      )}
    </div>
  );
};
