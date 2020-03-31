import { connect } from 'react-redux';
import NotesGrid from '../components/NotesGrid';
import { deleteNote, swapNotes } from '../redux';

const mapStateToProps = (state, props) => ({
  notes: state.notes,
  ...props
});

const mapDispatchToProps = dispatch => ({
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
