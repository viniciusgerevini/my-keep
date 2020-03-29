import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const NoteWrapper = styled.div `
  width: auto;
  min-width: 240px;
  max-height: 570px;
  min-height: 180px;
  background-color: ${props => props.theme.background};
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.borderColor};
  line-height: 1.2em;
  overflow: hidden;
  word-wrap: break-word;
  padding: 10px;

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 1px 3px 1px rgba(60,64,67,0.149);
  }

  [aria-label = "title"] {
    font-size: 1.1em;
    font-weight: 500;
    margin-bottom: 15px;
  }
`;

const GridWrapper = styled.div `
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(240px,1fr));
  grid-auto-rows: 180px;
  margin-top: 20px;
`;

export default function NotesGrid(props) {
  const gridRef = useRef(null);
  const {notes} = props;

  useEffect(() => {
    const grid = gridRef.current;
    const items = grid.children;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let rowHeight = 180;
      let rowGap = 15;
      let rowSpan = Math.ceil((item.firstChild.getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
      item.style.gridRowEnd = "span "+rowSpan;
    }
  });
 
  return (
    <GridWrapper ref={gridRef}>
      {notes.map((note) => <NoteCard key={note.id} className="grid-item" note={note}/>)}
    </GridWrapper>
  );
}

const NoteCard = (props) => {
  const { note, ...p } = props;
  return <NoteWrapper {...p}>
    <div>
      <div aria-label="title">{note.title}</div>
      <div aria-label="content" dangerouslySetInnerHTML={{__html: note.content}}></div>
    </div>
  </NoteWrapper>
};

