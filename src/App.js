import React, { useState } from 'react';
import { configureStore } from '@reduxjs/toolkit'
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import throttle from 'lodash/throttle';

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import MainPane from './components/MainPane';
import theme from './theme';
import reducer from './reducers';
import { loadState, saveState } from './storage/local-storage';

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
        <AppWrapper>
          <TopBar onSidebarButtonClicked={toggleSidebar} />
          { isSidebarVisible ? <SideBar /> : '' }
          <MainPaneWrapper isSidebarOpen={isSidebarVisible}>
            <MainPane/>
          </MainPaneWrapper>
        </AppWrapper>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
