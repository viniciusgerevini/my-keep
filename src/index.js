import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from 'styled-components';

const theme = {
  background: '#fff',
  shadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  sidebarSize: '300px',
  icon: {
    color: '#5f6368',
    hoverBackgroundColor: 'rgba(60,64,67,0.08)'
  }
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
