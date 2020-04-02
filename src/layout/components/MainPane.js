import React from 'react';
import styled from 'styled-components';
import TakeANoteBox from '../../notes/containers/TakeANoteBox';
import HomeGrid from '../../notes/containers/HomeGrid';
import PinnedGrid from '../../notes/containers/PinnedGrid';

export const MainPaneWrapper = styled.div `
  width: auto;
  background-color: ${props => props.theme.background};
  margin-top: 80px;
  padding: 20px 10px;
`;

export default function MainPane() {
  return <MainPaneWrapper>
    <TakeANoteBox/>
    <PinnedGrid />
    <HomeGrid />
  </MainPaneWrapper>;
}
