import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import NoteCard from './NotesGridCard';

const GridWrapper = styled.div `
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(240px,1fr));
  grid-auto-rows: 180px;
  margin-top: 20px;
`;

export default function NotesGrid(props) {
  const gridRef = useRef(null);
  const { notes, swapNotes } = props;

  useEffect(() => {
    const grid = gridRef.current;
    adjustGridItemsHeight(grid.children);
  });
 
  return (
    <DndProvider backend={Backend}>
      <GridWrapper ref={gridRef}>
        {notes.map((note, index) => <NoteCard key={note.id} index={index} swapNotes={swapNotes} className="grid-item" note={note}/>)}
      </GridWrapper>
    </DndProvider>
  );
}

const adjustGridItemsHeight = (items) => {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let rowHeight = 180;
    let rowGap = 15;
    let rowSpan = Math.ceil((item.firstChild.getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
  }
}
