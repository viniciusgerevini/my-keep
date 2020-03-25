import React from 'react';
import styled from 'styled-components';

export const MainPaneWrapper = styled.div `
  width: auto;
  height: 100%;
  background-color: #00f;
`;

export default function MainPane() {
  return <MainPaneWrapper/>; 
}
