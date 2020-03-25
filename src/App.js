import React, { useState } from 'react';
import styled from 'styled-components';
// import './App.css';

import TopBar from './layout/components/TopBar';
import SideBar from './layout/components/SideBar';
import MainPane from './layout/components/MainPane';

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
    <AppWrapper>
      <TopBar onSidebarButtonClicked={toggleSidebar} />
      { isSidebarVisible ? <SideBar /> : '' }
      <MainPaneWrapper isSidebarOpen={isSidebarVisible}>
        <MainPane/>
      </MainPaneWrapper>
    </AppWrapper>
  );
}

export default App;
