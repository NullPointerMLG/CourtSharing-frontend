import React, { useState, useContext, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import { Sport } from "../../../models/Sport";
import { SportsContext } from "../../../context/SportsContext";
import {MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";
import { EventParams } from "./../../../models/EventParams";
import { getSports } from "../../../services/api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed"
    },
    panel: {
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
    },
    title: {
      marginBottom: "0rem",
      paddingBottom: "0rem"
    }
  })
);

interface Props {
  handleFilterEvents: (params: EventParams) => void;
}

export const FilterMenu: React.FC<Props> = props => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [date, setDate] = useState<number | null>(null);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date !== null) {  
      setDate(parseInt((date.getTime()/1000).toFixed(0)));
    } else {
      setDate(date)
    }
  };

  const classes = useStyles();
  const [sport, setSport] = useState("");
  const [sports, setSports] = useContext(SportsContext);

  const handleChange = () => (event: any) => {
    setSport(event.target.value)
  };

  const filter = () => {
    let params: {[k: string]: any} = {};
    
    if (date !== null && date !== undefined){
      params.date = date
    } 
    params.date = date;
    if (sport !== "" && sport !== undefined){
      params.sport = sport
    }
    props.handleFilterEvents(params)
  }

  useEffect(() => {
    getSports()
    .then((responseSports: Sport[]) => {
      setSports(responseSports);
    })
    .catch(err => {
      console.warn(err);
    });
  }, [setSports])
  
  return (
    <div className={classes.root}>
      <Paper className={classes.panel}>
        <h1>Filter</h1>
        <h4>Sport</h4>
        <Select
          native
          value={sport}
          onChange={handleChange()}
          inputProps={{
            name: "sport",
            id: "sport-native-simple"
          }}
        >
          <option key="All" value="">
            All
          </option>
          {sports.map((sport: Sport) => (
            <option key={sport.name} value={sport._id.$oid}>
              {sport.name}
            </option>
          ))}
        </Select>
        <h4 className={classes.title}>Date</h4>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="dense"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={() => filter()}>
          Filter
        </Button>
      </Paper>
    </div>
  );
};
