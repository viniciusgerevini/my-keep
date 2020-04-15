import React from 'react';
import PropTypes from 'prop-types';

import NotesGrid from './NotesGrid';

export default function MainNotesGrid(props) {
  const {
    notes,
    deleteNote,
    swapNotes,
    updateNote,
    duplicateNote,
    pinNoteAction,
  } = props;

  return (
    <NotesGrid
      notes={notes}
      swapNotes={swapNotes}
      updateNote={updateNote}
      deleteNote={deleteNote}
      duplicateNote={duplicateNote}
      pinNoteAction={pinNoteAction}
    />);
}

MainNotesGrid.propTypes = {
  notes: PropTypes.array.isRequired,
  deleteNote: PropTypes.func.isRequired,
  duplicateNote: PropTypes.func.isRequired,
  swapNotes: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  pinNoteAction: PropTypes.func
};
