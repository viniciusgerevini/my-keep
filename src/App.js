import React, { useState } from 'react';
import { configureStore } from '@reduxjs/toolkit'
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import throttle from 'lodash/throttle';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import HomePage from './pages/Home';
import theme from './theme';
import reducer from './reducers';
import { loadState, saveState } from './storage/local-storage';
import Archive from './pages/Archive';

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: loadState(),
})

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState({
    notes: state.notes
  });
}, 1000));

const AppWrapper = styled.div `
  height: 100%;
  overflow: auto;
`;

const MainPaneWrapper = styled.div `
  width: auto;
  height: 100%;
  overflow: hidden;

  @media(min-width: 750px) {
    margin-left: ${props => props.isSidebarOpen ? '300px' : '0px'};
  }
`;

function App() {
  const [ isSidebarVisible, setSidebarVisible ] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppWrapper>
            <TopBar onSidebarButtonClicked={toggleSidebar} />
            { isSidebarVisible ? <SideBar /> : '' }
            <MainPaneWrapper isSidebarOpen={isSidebarVisible}>
              <Switch>
                <Route path="/archive">
                  <Archive/>
                </Route>
                <Route path="/">
                  <HomePage/>
                </Route>
              </Switch>
            </MainPaneWrapper>
          </AppWrapper>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
