import React, { useState } from 'react';
import { createStore } from 'redux';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import TopBar from './layout/components/TopBar';
import SideBar from './layout/components/SideBar';
import MainPane from './layout/components/MainPane';
import reducers from './reducers';

const theme = {
  background: '#fff',
  secondaryBackground: 'rgba(60,64,67,0.08)',
  textColor: '#202124',
  secondaryTextColor: '#80868b',
  shadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  sidebarSize: '300px',
};

const initialState = {};

const store = createStore(reducers, initialState, devToolsEnhancer());


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
