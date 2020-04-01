import { connect } from 'react-redux';
import NotesGrid from '../components/NotesGrid';
import { updateNote, deleteNote, swapNotes } from '../redux';

const mapStateToProps = (state, props) => ({
  notes: state.notes,
  ...props
});

const mapDispatchToProps = dispatch => ({
  updateNote: (note) => {
    dispatch(updateNote(note));
  },
  deleteNote: (id) => {
    dispatch(deleteNote(id));
  },
  swapNotes: (src, dest) => {
      dispatch(swapNotes({src, dest}));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesGrid);
