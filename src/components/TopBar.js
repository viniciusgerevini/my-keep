import React from 'react';
import styled from 'styled-components';
import { MdMenu, MdLightbulbOutline } from 'react-icons/md';

export const TopBarWrapper = styled.div `
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${props => props.theme.background};
  z-index: 100;
  padding: 10px 15px;
  box-shadow: ${props => props.theme.shadow};
  color: ${props=> props.theme.secondaryTextColor};
`;

const TopBarIconWrapper = styled.div `
  display: inline-flex;
  font-size: 1.5em;
  color: ${props=> props.theme.secondaryTextColor};
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${props=> props.theme.secondaryBackground};
  }
`;

const AppIconWrapper = styled.div `
  display: inline-flex;
  padding: 5px;
  background-color: #f1b003;
  color: #fff;
  margin: 0px 10px;
  border-radius: 5px;
`;

const AppLogoWrapper = styled.div `
  display: inline-flex;
  align-items: center;
  font-size: 1.5em;
  margin: 0px 10px;
  cursor: default;
`;

export default function TopBar(props) {
  return <TopBarWrapper>
    <TopBarIconWrapper aria-label="Sidebar Toggle Button" onClick= {() => props.onSidebarButtonClicked()}>
      <MdMenu />
    </TopBarIconWrapper>
    <AppLogoWrapper>
      <AppIconWrapper>
        <MdLightbulbOutline/>
      </AppIconWrapper>
      MyKeep
    </AppLogoWrapper>
  </TopBarWrapper>; 
}
