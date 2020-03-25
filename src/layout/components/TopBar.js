import React from 'react';
import styled from 'styled-components';
import { MdMenu } from 'react-icons/md';

// #5f6368

export const TopBarWrapper = styled.div `
  position: fixed;
  width: 100%;
  // height: 50px;
  background-color: #fff;
  z-index: 100;
  padding: 10px 15px;
  // box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  // box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

const TopBarIconWrapper = styled.div `
  display: inline-flex;
  font-size: 1.5em;
  color: #5f6368;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(60,64,67,0.08);
  }
`;

export default function TopBar(props) {
  return <TopBarWrapper>
    <TopBarIconWrapper onClick= {() => props.onSidebarButtonClicked()}>
      <MdMenu />
    </TopBarIconWrapper>
  </TopBarWrapper>; 
}
