import React, { useState, useReducer, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import { reducer, State } from "./FilterReducer";
import { Sport } from "../../../models/Sport";
import { SportsContext } from "../../../context/SportsContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "1rem"
    }
  })
);

export const FilterMenu: React.FC = props => {
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
      </Paper>
    </div>
  );
};
