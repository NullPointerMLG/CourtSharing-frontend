import React, { useContext, useState, useEffect } from "react";
import { GeoJsonObject } from "geojson";
import { Map, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
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
import { getCourts, getParking } from "../../../services/API";
import AddIcon from "@material-ui/icons/Add";
import { usePosition } from "use-position";
import classnames from 'classnames';
import { ParkingResponse } from "../../../models/ParkingResponse";

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
  },
  filterOptions: {
    position: "absolute",
    margin: "10px",
    right: "5%",
    bottom: "0px",
    zIndex: 999,
    display: "flex",
    flexDirection: "column"
  },
  filterButton: {
    backgroundColor: theme.palette.primary.contrastText,
    marginBottom: "10px",
    backgroundSize: "80% 80%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },
  filterInactive: {
    backgroundColor: theme.palette.secondary.dark
  }
}));

interface CourtMapProps {
  onAddEventClick: any;
}

const MLG_DEFAULT_LOCATION: LatLngExpression = [36.72354892, -4.427047];

const isNearMalaga = (latitude: number, longitude: number): boolean => {
  return (
    Math.abs(latitude - MLG_DEFAULT_LOCATION[0]) < 1 &&
    Math.abs(longitude - MLG_DEFAULT_LOCATION[1]) < 1
  );
};

const DEFAULT_ICON_SIZE: [number, number] = [20, 20];

const getIconFromURL = (url: string): any => {
  return icon({
    iconUrl: url,
    iconSize: DEFAULT_ICON_SIZE
  });
};

export const CourtMap = (props: CourtMapProps) => {
  const classes = useStyle();
  const { latitude, longitude } = usePosition();
  const position: LatLngExpression =
    latitude && longitude && isNearMalaga(latitude, longitude)
      ? [latitude, longitude]
      : MLG_DEFAULT_LOCATION;
  const [selectedSport] = useContext(SelectedSportContext);
  const [geoJson, setGeoJson] = useState<GeoJsonObject>();
  const [selectedMarker, setSelectedMarker] = useState();
  const [parkings, setParkings] = useState<ParkingResponse[]>();
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

  useEffect(() => {
    if (selectedMarker) {
      getParking(selectedMarker.geometry.coordinates).then(
        (parkingResponses: ParkingResponse[]) => {
          parkingResponses.forEach(
            (parking: ParkingResponse) => (parking.active = true)
          );
          setParkings(parkingResponses);
        }
      );
    }
  }, [selectedMarker]);

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

  const onEachParkingFeature = (feature: any, layer: Layer) => {
    if (feature.properties) {
      const popup: Content = decodeURIComponent(
        escape(feature.properties.description)
      );
      layer.bindPopup(popup);
    }
  };

  const onFilterClick = (parking: ParkingResponse) => {
    if (parkings) {
      const currentParkings: ParkingResponse[] = parkings.map((iterParking: ParkingResponse) => {
        if (iterParking === parking) iterParking.active = !iterParking.active;
        return iterParking;
      });
      setParkings(currentParkings);
    }
  };

  const sportLayer = (feature: any, latlng: any) => {
    return L.marker(latlng, { icon: sportIcon });
  };

  const parkingLayer = (feature: any, latlng: any) => {
    return L.marker(latlng, {
      icon: getIconFromURL(feature.properties.marker_url)
    });
  };

  return (
    <div>
      {geoJson && selectedSport && (
        <div className={classes.mapContainer}>
          {selectedMarker && (
            <Fab
              onClick={() => props.onAddEventClick(selectedMarker)}
              className={classes.addFab}
            >
              <AddIcon />
            </Fab>
          )}
          {parkings && (
            <div className={classes.filterOptions}>
              {parkings.map((value: ParkingResponse) => (
                <Fab
                  className={classnames({[classes.filterButton]: true, [classes.filterInactive]: !value.active})}
                  onClick={() => onFilterClick(value)}
                  style={{ backgroundImage: `url(${value.marker_url})` }}
                ></Fab>
              ))}
            </div>
          )}
          <Map center={position} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON
              key={geoJson.toString()}
              data={geoJson}
              icon={sportIcon}
              pointToLayer={sportLayer}
              onEachFeature={onEachFeature}
            />
            {parkings &&
              parkings.map((parking: ParkingResponse) => {
                return parking.active ? (
                  <GeoJSON
                    key={parking.data.toString()}
                    data={parking.data}
                    onEachFeature={onEachParkingFeature}
                    pointToLayer={parkingLayer}
                  />
                ) : (
                  <div />
                );
              })}
            {latitude && longitude && isNearMalaga(latitude, longitude) && (
              <Marker position={position}>
                <Popup>This is your location</Popup>
              </Marker>
            )}
          </Map>
        </div>
      )}
    </div>
  );
};
