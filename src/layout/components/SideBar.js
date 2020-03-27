import React from 'react';
import styled from 'styled-components';

export const SideBarWrapper = styled.div `
  position: absolute;
  width: 300px;
  height: 100%;
  background-color: ${props => props.theme.background};
`;

export default function SideBar() {
  return (<SideBarWrapper>hello</SideBarWrapper>);
}
