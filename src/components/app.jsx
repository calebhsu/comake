import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { green100, green500, green700 } from 'material-ui/styles/colors';

import React from 'react';
import NavBar from './NavBar';
import BoardView from './board_view/BoardView';

import '../scss/main.scss';

const styles = {
  container: {
    marginTop: '15px',
    textAlign: 'center',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
});

/**
 * Assembles and returns the HTML for the App.
 * @return {HTML}   The HTML of the application.
 */
function App() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <NavBar />
        <div style={styles.container}>
          <h1>It Works!</h1>
          <p>This React project works including local CSS styles.</p>
          <RaisedButton label="Enjoy" />
        </div>
        <BoardView />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
