import { connect } from 'react-redux';
import MainNotesGrid from '../components/MainNotesGrid';
import {
  createNote,
  updateNote,
  deleteNote,
  swapNotes,
  pinNote,
  unpinNote,
  archiveNote,
} from '../redux/notes';

const sortBySortOrder = (a, b) =>  b.sortOrder - a.sortOrder;

const mapStateToProps = (state, props) => ({
  notes: state.notes.filter(n => !n.isPinned && !n.isArchived).sort(sortBySortOrder),
  pinnedNotes: state.notes.filter(n => !!n.isPinned && !n.isArchived).sort(sortBySortOrder),
  ...props
});

const mapDispatchToProps = dispatch => ({
  updateNote: (note) => {
    dispatch(updateNote(note));
  },
  deleteNote: (id) => {
    dispatch(deleteNote(id));
  },
  duplicateNote: (note) => {
    const duplicate = {
      ...note,
      id: undefined
    };

    dispatch(createNote(duplicate));
  },
  swapNotes: (src, dest) => {
      dispatch(swapNotes({src, dest}));
  },

  pinNoteAction: (id) => {
    dispatch(pinNote(id));
  },

  unpinNoteAction: (id) => {
    dispatch(unpinNote(id));
  },

  archiveNote: (id) => {
    dispatch(archiveNote(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNotesGrid);
