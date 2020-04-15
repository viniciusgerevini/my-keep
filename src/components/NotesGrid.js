import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import NoteCard from './NotesGridCard';
import EditNoteModal from './EditNoteModal';

const GridWrapper = styled.div `
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(240px,1fr));
  grid-auto-rows: 180px;
`;

const GridLabel = styled.h2 `
  margin-top: 50px;
  margin-bottom: 10px;
  font-weight: bold;
  font-variant: small-caps;
  text-transform: lowercase;
  color: ${props => props.theme.secondaryTextColor};
`;

export default function NotesGrid(props) {
  const [noteToEdit, setNoteToEdit] = useState(null);
  const gridRef = useRef(null);
  const {
    notes,
    deleteNote,
    swapNotes,
    updateNote,
    duplicateNote,
    pinNoteAction,
    gridTitle
  } = props;

  useEffect(() => {
    const grid = gridRef.current;
    adjustGridItemsHeight(grid.children);
  });

  const openNote = (note) => {
    setNoteToEdit(note);
  };

  const onModalClose = () => {
    setNoteToEdit(null);
  };

  return (
    <DndProvider backend={Backend}>
      <GridLabel>{gridTitle}</GridLabel>
      <GridWrapper ref={gridRef}>
        {notes.map((note) =>
          <NoteCard
            key={note.id}
            swapNotes={swapNotes}
            deleteNote={deleteNote}
            duplicateNote={duplicateNote}
            togglePinNote={pinNoteAction}
            className="grid-item"
            aria-label="note"
            note={note}
            onClick={() => openNote(note)}
          />
        )}
      </GridWrapper>
      { noteToEdit ? <EditNoteModal note={noteToEdit} updateNote={updateNote} onModalClose={onModalClose}/> : null }
    </DndProvider>
  );
}

NotesGrid.propTypes = {
  gridTitle: PropTypes.string,
  notes: PropTypes.array.isRequired,
  deleteNote: PropTypes.func.isRequired,
  duplicateNote: PropTypes.func.isRequired,
  swapNotes: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  pinNoteAction: PropTypes.func
};

const adjustGridItemsHeight = (items) => {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let rowHeight = 180;
    let rowGap = 15;
    let rowSpan = Math.ceil((item.firstChild.getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
  }
}
