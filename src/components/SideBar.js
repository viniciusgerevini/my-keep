import React from 'react';
import styled from 'styled-components';
import {
  Link
} from "react-router-dom";

export const SideBarWrapper = styled.div `
  position: absolute;
  width: 300px;
  height: 100%;
  background-color: ${props => props.theme.background};
  padding-top: 100px;
`;

export default function SideBar() {
  return <SideBarWrapper aria-label="Sidebar">
    <nav>
      <ul>
        <li>
          <Link to="/">Notes</Link>
        </li>
        <li>
          <Link to="/archive">Archive</Link>
        </li>
      </ul>
    </nav>
  </SideBarWrapper>;
}
