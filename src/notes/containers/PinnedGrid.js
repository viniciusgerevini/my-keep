import { connect } from 'react-redux';
import NotesGrid from '../components/NotesGrid';
import {
  createNote,
  updateNote,
  deleteNote,
  swapNotes,
  unpinNote
} from '../redux';

const mapStateToProps = (state, props) => ({
  notes: state.notes.filter(n => !!n.isPinned)
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
    dispatch(unpinNote(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesGrid);
