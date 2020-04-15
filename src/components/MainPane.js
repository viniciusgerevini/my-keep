import React from 'react';
import styled from 'styled-components';
import TakeANoteBox from '../containers/TakeANoteBox';
import HomeGrid from '../containers/HomeGrid';

export const MainPaneWrapper = styled.div `
  width: auto;
  background-color: ${props => props.theme.background};
  margin-top: 80px;
  padding: 20px 10px;
`;

export default function MainPane() {
  return <MainPaneWrapper>
    <TakeANoteBox/>
    <HomeGrid />
  </MainPaneWrapper>;
}
