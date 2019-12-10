import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import { MuiThemeProvider, makeStyles } from "@material-ui/core";
import { initializeFirebase } from "./utils/firebase";
import { Feed } from "./components/Pages/Feed/Feed";
import { MainAppBar } from "./components/Utils/AppBar";
import { ContextProvider } from "./context/ContextProvider";
import { Homepage } from "./components/Pages/Homepage/Homepage";
import { Landing } from "./components/Pages/Landing/Landing";
import { NotFound } from "./components/Pages/NotFound/NotFound";
import { AddEvent } from "./components/Pages/Add-Event/AddEvent";

initializeFirebase();

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  component: { height: "100%", overflowY: "scroll" }
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <ContextProvider>
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <MainAppBar></MainAppBar>
            <React.Fragment>
              <div className={classes.component}>
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/feed" component={Feed} />
                  <Route exact path="/homepage" component={Homepage} />
                  <Route exact path="/add-event" component={AddEvent} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </React.Fragment>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    </ContextProvider>
  );
};

export default App;
