import React from 'react';
import styled from 'styled-components';

export const MainPaneWrapper = styled.div `
  width: auto;
  height: 100%;
  background-color: ${props => props.theme.background};
`;

export default function MainPane() {
  return <MainPaneWrapper/>; 
}
