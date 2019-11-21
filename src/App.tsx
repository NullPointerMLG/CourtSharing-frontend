import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Landing } from "./components/pages/Landing/Landing";
import Register from "./components/pages/Register/Register";
import { NotFound } from "./components/pages/NotFound/NotFound";
import { theme } from "./themes/theme";
import { MuiThemeProvider, makeStyles } from "@material-ui/core";
import { initializeFirebase } from "./utils/firebase";
import { Login } from "./components/pages/Login/Login";
import { Feed } from "./components/pages/Feed/Feed";
import { MainAppBar } from "./components/shared/AppBar";
import { UserProvider } from "./context/UserContext";

const useStyles = makeStyles(theme => ({
  root: { height: "100%"}
}));

const App: React.FC = () => {  

  initializeFirebase();
  const classes = useStyles();
  return (
    <UserProvider>
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <MainAppBar></MainAppBar>
            <React.Fragment>
              <Switch>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/feed" component={Feed} />
                <Route component={NotFound} />
              </Switch>
            </React.Fragment>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    </UserProvider>
  );
};

export default App;
