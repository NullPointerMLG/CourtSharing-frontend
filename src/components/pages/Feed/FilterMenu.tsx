import React, { useState, useReducer, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import { reducer, State } from "./FilterReducer";
import { Sport } from "../../../models/Sport";
import { SportsContext } from "../../../context/SportsContext";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "1rem"
    }
  })
);

export const FilterMenu: React.FC = props => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const classes = useStyles();  
  const initialFilterState: State = {sport: '', date: ''};
  const initialState = {date: '', sport: ''}
  const [filterState, dispatch] = useReducer(reducer, initialFilterState);
  const [state, setState] = useState(initialState)
  const [sports] = useContext(SportsContext);
  const handleChange = (name: any ) => (event: any) => {
    setState({
      ...state,
      [name]: event.target.value,
    });
    dispatch({type: "UPDATE_STATE", state})
  }; 

  return (
    <div>
      <Paper className={classes.root}>
        <h1>Filter</h1>
        <h4>Sport</h4>
        <Select
          native
          value={state.sport}
          onChange={handleChange('sport')}
          inputProps={{
            name: 'sport',
            id: 'sport-native-simple',
          }}
        >
          <option value="All">All</option>
          {sports.map((sport: Sport) => 
            <option value={sport.name}>{sport.name}</option>
          )}
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
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
      </Paper>
    </div>
  );
};
