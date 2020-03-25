import React from 'react';
import styled from 'styled-components';

export const SideBarWrapper = styled.div `
  position: absolute;
  width: 300px;
  height: 100%;
  background-color: #fff;
`;

export default function SideBar(props) {
  console.log(props.isVisible);
  return (<SideBarWrapper/>);
}
