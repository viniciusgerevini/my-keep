import React from 'react';
import styled from 'styled-components';

export const TopBarWrapper = styled.div `
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: #f00;
  z-index: 100;
`;

export default function TopBar() {
  return <TopBarWrapper/>; 
}
