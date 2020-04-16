import React from 'react';
import styled from 'styled-components';
import { MdUndo, MdRedo, MdUnarchive } from 'react-icons/md';
import { FiArchive } from 'react-icons/fi';
import { FaEllipsisV } from 'react-icons/fa';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';

export const IconWrapper = styled.div `
  display: inline-flex;
  color: ${props=> props.theme.textColor};
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  opacity: .54;

  margin: 0px 5px;

  &:hover {
    opacity: 1;
    background-color: ${props=> props.theme.secondaryBackground};
  }
`;

export const UndoIcon = (props) => <IconWrapper {...props}><MdUndo/></IconWrapper>;
export const RedoIcon = (props) => <IconWrapper {...props}><MdRedo/></IconWrapper>;
export const MenuBallsIcon = (props) => <IconWrapper {...props}><FaEllipsisV/></IconWrapper>;
export const PinIcon = (props) => <IconWrapper {...props}><AiOutlinePushpin/></IconWrapper>;
export const UnpinIcon = (props) => <IconWrapper {...props}><AiFillPushpin/></IconWrapper>;

export const ArchiveIcon = (props) => <IconWrapper {...props}><FiArchive/></IconWrapper>;
export const UnarchiveIcon = (props) => <IconWrapper {...props}><MdUnarchive/></IconWrapper>;

export const ActionButton = styled.button `
  color: ${props=> props.theme.textColor};
  background-color: ${props=> props.theme.background};
  font-weight: bold;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  box-shadow:  none;
  cursor: pointer;
  outline: none;
  opacity: .54;

  ::-moz-focus-inner {
     border: 0;
  }

  &:hover {
    opacity: 1;
    background-color: ${props=> props.theme.secondaryBackground};
  }
`;


