import React, { useState, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import { Sport } from "../../../models/Sport";
import { SportsContext } from "../../../context/SportsContext";
import {MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";
import { EventParams } from "./../../../models/EventParams";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "1rem"
    }
  })
);

interface Props {
  handleFilterEvents: (params: EventParams) => void;
}

export const FilterMenu: React.FC<Props> = props => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [date, setDate] = useState(new Date().getTime()/1000);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date !== null) {  
      setDate(date.getTime()/1000);
    }
  };

  const classes = useStyles();
  const initialState = { date: "", sport: "" };
  const [state, setState] = useState(initialState);
  const [sports] = useContext(SportsContext);

  const handleChange = (name: any) => (event: any) => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (
    <div>
      <Paper className={classes.root}>
        <h1>Filter</h1>
        <h4>Sport</h4>
        <Select
          native
          value={state.sport}
          onChange={handleChange("sport")}
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
        <h4>Date</h4>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
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
          onClick={() => props.handleFilterEvents({ sport: state.sport, date: date })}>
          Filter
        </Button>
      </Paper>
    </div>
  );
};
