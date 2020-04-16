import { connect } from 'react-redux';
import NotesGrid from '../components/NotesGrid';
import {
  createNote,
  updateNote,
  deleteNote,
  swapNotes,
  unarchiveNote,
} from '../redux/notes';

const sortBySortOrder = (a, b) =>  b.sortOrder - a.sortOrder;

const mapStateToProps = (state, props) => ({
  notes: state.notes.filter(n => n.isArchived).sort(sortBySortOrder),
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
  unarchiveNote: (id) => {
    dispatch(unarchiveNote(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesGrid);
