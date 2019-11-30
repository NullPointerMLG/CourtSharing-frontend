import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import { MuiThemeProvider, makeStyles } from "@material-ui/core";
import { initializeFirebase } from "./utils/firebase";
import { Feed } from "./components/Pages/Feed/Feed";
import { MainAppBar } from "./components/Shared/AppBar";
import { ContextProvider } from "./context/ContextProvider";
import { Homepage } from "./components/Pages/Homepage/Homepage";
import { Landing } from "./components/Pages/Landing/Landing";
import Register from "./components/Pages/Register/Register";
import { NotFound } from "./components/Pages/NotFound/NotFound";
import { UserProvider } from "./context/UserContext";

initializeFirebase();

const useStyles = makeStyles(theme => ({
  root: { height: "100vh", display: "flex", flexDirection: "column" }
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
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/feed" component={Feed} />
                <Route exact path="/homepage" component={Homepage} />
                <Route component={NotFound} />
              </Switch>
            </React.Fragment>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    </ContextProvider>
  );
};

export default App;
