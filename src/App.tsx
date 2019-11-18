import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import {Landing} from './components/Landing/Landing';
import Register from './components/Register/Register';
import { NotFound } from './components/NotFound/NotFound';
import { theme } from './themes/theme';
import { MuiThemeProvider } from '@material-ui/core';
import { initializeFirebase } from './utils/firebase';

const App: React.FC = () => {
  initializeFirebase();

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <React.Fragment> 
              <Switch>
                <Route exact path="/" component={Landing} /> 
                <Route exact path="/register" component={Register} />
                <Route component={NotFound} />
              </Switch> 
            </React.Fragment>
          </BrowserRouter>   
        </MuiThemeProvider>
    </div>
  );
}

export default App;
