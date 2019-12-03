import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Event as EventEntity } from "../../../../models/Event";
import { UserInfo } from "./../../../Utils/UserInfo";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import { updateEvent, getEvents, getCourts } from "./../../../../services/API";
import { Map } from "./../../../Utils/Map";
import { GeoJsonObject } from "geojson";

const courtMock: any = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-4.427154, 36.71217891, 0]
    },
    geometry_name: "SDOGEOMETRIA",
    properties: {
      TITULARIDAD: "MUNICIPAL",
      URL: "http://www.o2centrowellness.com/MSite/Home.aspx?ID=MAL",
      DIRECCION: "CALLE PLAZA DE TOROS VIEJA, 5 ",
      ACCESOPMR: "No",
      INFOESP: {
        Espacio_deportivo: "Piscina cubierta",
        Iluminacion: "Si",
        Actividad_deportiva: "Actividades Acu\u00e1ticas",
        Dimensiones_en_metros: "25x12,5",
        Tipo_de_pavimento: "Baldosas"
      },
      TARJETAJOVEN: "No",
      NOMBRE: "O2 CENTRO WELLNESS PERCHEL (CENTRO DEPORTIVO EL PERCHEL)",
      EMAIL: "elperchel@o2centrowellness.com",
      ID: 248
    },
    id: "da_deportesPiscinas.fid--5673ced1_16ec3a9f062_69ee"
  }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500,
      margin: "6px"
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    },

    description: {
      marginTop: "16px"
    },
    assistContainer: {
      display: "flex"
    },
    assistButton: {
      marginLeft: "auto"
    }
  })
);

interface Props {
  event: EventEntity;
  onClick: (event: EventEntity) => void;
  userUUID: string;
  setEvents: (events: EventEntity[]) => void;
}

export function formatDate(value: number): string {
  const date: Date = new Date(value);
  return date.toLocaleDateString();
}

export const Event: React.FC<Props> = props => {
  const classes = useStyles();
  const [assist, setAssist] = useState<boolean>();
  const { event, userUUID } = props;
  const [court, setCourt] = useState<GeoJsonObject>();
  /*
  useEffect(() => {}, []);
  */
  useEffect(() => {
    let found = false;
    for (let key in event.participants) {
      if (event.participants[key].uuid === userUUID) {
        setAssist(true);
        found = true;
        break;
      }
    }
    if (!found) {
      setAssist(false);
    }
  }, [event.participants, userUUID]);

  const onClickAssist = () => {
    updateEvent(props.event.id, { participantUUID: props.userUUID })
      .then(() => {
        reloadEvents();
      })
      .catch(e => console.warn(e));
  };

  const reloadEvents = () => {
    getEvents()
      .then(res => props.setEvents(res))
      .catch(e => console.warn(e));
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
        }
        title={props.event.title}
        subheader={formatDate(props.event.eventDate)}
        onClick={() => props.onClick(props.event)}
      />
      <CardContent>
        <div>
          <Map sport={props.event.sport} court={courtMock} />
        </div>
        <UserInfo
          avatar={props.event.creator.photoURL}
          name={props.event.creator.name}
          size={24}
        />
        <Divider />
        <Typography
          className={classes.description}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {props.event.description}
        </Typography>
        {props.event.creator.uuid !== props.userUUID && (
          <div className={classes.assistContainer}>
            <Button
              variant="contained"
              color={!assist ? "primary" : "secondary"}
              className={classes.assistButton}
              onClick={onClickAssist}
            >
              {!assist ? "Assist" : "Cancel"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
