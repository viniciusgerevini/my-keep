import React from 'react';
import styled from 'styled-components';
import AddNoteBox from '../../notes/components/AddNoteBox';

export const MainPaneWrapper = styled.div `
  width: auto;
  background-color: ${props => props.theme.background};
  margin-top: 80px;
  padding: 20px 10px;
`;

export default function MainPane() {
  return <MainPaneWrapper>
    <AddNoteBox/>
  </MainPaneWrapper>; 
}
