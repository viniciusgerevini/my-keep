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
    archiveNote
  } = props;

  const isTherePinnedNotes = pinnedNotes && pinnedNotes.length;

  return (
    <React.Fragment>
      <NotesGrid
        gridTitle={ isTherePinnedNotes ? 'Pinned' : undefined }
        notes={pinnedNotes || []}
        swapNotes={swapNotes}
        updateNote={updateNote}
        deleteNote={deleteNote}
        duplicateNote={duplicateNote}
        pinNoteAction={unpinNoteAction}
        archiveNote={archiveNote}
      />
      <NotesGrid
        gridTitle={ isTherePinnedNotes ? 'Others' : undefined }
        notes={notes}
        swapNotes={swapNotes}
        updateNote={updateNote}
        deleteNote={deleteNote}
        duplicateNote={duplicateNote}
        pinNoteAction={pinNoteAction}
        archiveNote={archiveNote}
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
  pinNoteAction: PropTypes.func,
  archiveNote: PropTypes.func,
};
