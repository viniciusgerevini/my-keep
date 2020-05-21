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
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from './HTML5toTouch';
import { DndProvider } from 'react-dnd';

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import HomePage from './pages/Home';
import theme from './theme';
import reducer from './reducers';
import { loadState, saveState } from './storage/local-storage';
import ArchiveGrid from './containers/ArchiveGrid';

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
  padding: 10px;

  margin-left: ${props => props.isSidebarOpen ? '300px' : '0px'};
`;

export const MainPaneInnerWrapper = styled.div `
  width: auto;
  background-color: ${props => props.theme.background};
  margin-top: 80px;
  padding: 20px 10px;
`;

function App() {
  const [ isSidebarVisible, setSidebarVisible ] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <Router basename="/my-keep">
            <AppWrapper>
              <TopBar onSidebarButtonClicked={toggleSidebar} />
              { isSidebarVisible ? <SideBar /> : '' }
              <MainPaneWrapper isSidebarOpen={isSidebarVisible}>
                <Switch>
                  <Route path="/archive">
                    <MainPaneInnerWrapper>
                      <ArchiveGrid/>
                    </MainPaneInnerWrapper>
                  </Route>
                  <Route exact path="/">
                    <HomePage/>
                  </Route>
                </Switch>
              </MainPaneWrapper>
            </AppWrapper>
          </Router>
        </DndProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
