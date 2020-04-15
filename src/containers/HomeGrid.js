import { connect } from 'react-redux';
import MainNotesGrid from '../components/MainNotesGrid';
import {
  createNote,
  updateNote,
  deleteNote,
  swapNotes,
  pinNote
} from '../redux/notes';

const mapStateToProps = (state, props) => ({
  notes: state.notes.filter(n => !n.isPinned)
                    .sort((a, b) =>  b.sortOrder - a.sortOrder),
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNotesGrid);
