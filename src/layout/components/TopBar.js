import React from 'react';
import styled from 'styled-components';
import { MdMenu } from 'react-icons/md';

// #5f6368

export const TopBarWrapper = styled.div `
  position: fixed;
  width: 100%;
  background-color: ${props => props.theme.background};
  z-index: 100;
  padding: 10px 15px;
  box-shadow: ${props => props.theme.shadow};
`;

const TopBarIconWrapper = styled.div `
  display: inline-flex;
  font-size: 1.5em;
  color: ${props=> props.theme.icon.color};
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${props=> props.theme.icon.hoverBackgroundColor};
  }
`;

export default function TopBar(props) {
  return <TopBarWrapper>
    <TopBarIconWrapper onClick= {() => props.onSidebarButtonClicked()}>
      <MdMenu />
    </TopBarIconWrapper>
  </TopBarWrapper>; 
}
