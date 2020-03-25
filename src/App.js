import React from 'react';
import styled from 'styled-components';
// import './App.css';

import TopBar from './layout/components/TopBar';
import SideBar from './layout/components/SideBar';
import MainPane from './layout/components/MainPane';

const AppWrapper = styled.div `
  height: 100%;
  overflow: auto;
`;

function App() {
  return (
    <AppWrapper>
      <TopBar />
      <SideBar/>
      <MainPane/>
    </AppWrapper>
  );
}

export default App;
