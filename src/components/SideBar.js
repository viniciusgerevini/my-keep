import React from 'react';
import styled from 'styled-components';
import { NotesIcon, ArchiveIcon } from '../styled';

import {
  NavLink
} from "react-router-dom";

export const SideBarWrapper = styled.div `
  position: absolute;
  width: 300px;
  height: 100%;
  background-color: ${props => props.theme.background};
  padding-top: 100px;
`;

const Menu = styled.ul `
`;

const MenuItem = styled.li `
  font-weight: 500;

  a {
    display: flex;
    padding: 20px 30px;
    margin-right: 20px;
    border-radius: 0px 50px 50px 0px;
    color: ${props => props.theme.textColor};
    text-decoration: none;
    outline: none;
    ::-moz-focus-inner {
       border: 0;
    }

    :hover {
      background-color: ${props => props.theme.secondaryBackground};
    }

    &.active {
      background-color: ${props => props.theme.highlightColor};
      :hover {
        background-color: ${props => props.theme.highlightColor};
      }
    }

    span {
      padding-right: 40px;
    }
  }
`;

export default function SideBar() {
  return <SideBarWrapper aria-label="Sidebar">
    <nav>
      <Menu>
        <MenuItem>
          <NavLink to="/" exact={true} activeClassName="active">
            <span><NotesIcon/></span> Notes
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/archive" activeClassName="active">
            <span><ArchiveIcon/></span> Archive
          </NavLink>
        </MenuItem>
      </Menu>
    </nav>
  </SideBarWrapper>;
}
