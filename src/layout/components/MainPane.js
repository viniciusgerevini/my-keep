import React from 'react';
import styled from 'styled-components';
import NoteBox from '../../notes/components/NoteBox';

export const MainPaneWrapper = styled.div `
  width: auto;
  background-color: ${props => props.theme.background};
  margin-top: 80px;
  padding: 20px 10px;
`;

export default function MainPane() {
  return <MainPaneWrapper>
    <NoteBox updateNote={(update)=> console.log(update)}/>
  </MainPaneWrapper>; 
}
