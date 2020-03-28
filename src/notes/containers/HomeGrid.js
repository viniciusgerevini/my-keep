import { connect } from 'react-redux';
import NotesGrid from '../components/NotesGrid';

const mapStateToProps = (state, props) => ({
  notes: state.notes,
  ...props
});

// const mapDispatchToProps = dispatch => ({
//   updateNote: payload => {
//     if (payload.title !== undefined || payload.content !== undefined)
//       dispatch(createNote(payload))
//   }
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(NotesGrid);
