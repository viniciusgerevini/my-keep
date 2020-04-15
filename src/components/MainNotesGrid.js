import React from 'react';
import PropTypes from 'prop-types';

import NotesGrid from './NotesGrid';

export default function MainNotesGrid(props) {
  const {
    notes,
    pinnedNotes,
    deleteNote,
    swapNotes,
    updateNote,
    duplicateNote,
    pinNoteAction,
    unpinNoteAction,
  } = props;

  return (
    <React.Fragment>
      <NotesGrid
        notes={pinnedNotes || []}
        swapNotes={swapNotes}
        updateNote={updateNote}
        deleteNote={deleteNote}
        duplicateNote={duplicateNote}
        pinNoteAction={unpinNoteAction}
      />
      <NotesGrid
        notes={notes}
        swapNotes={swapNotes}
        updateNote={updateNote}
        deleteNote={deleteNote}
        duplicateNote={duplicateNote}
        pinNoteAction={pinNoteAction}
      />
    </React.Fragment>
  );
}

MainNotesGrid.propTypes = {
  notes: PropTypes.array.isRequired,
  deleteNote: PropTypes.func.isRequired,
  duplicateNote: PropTypes.func.isRequired,
  swapNotes: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  pinNoteAction: PropTypes.func
};
