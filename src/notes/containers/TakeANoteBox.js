import { connect } from 'react-redux';
import { createNote } from '../redux';
import NoteBox from '../components/NoteBox';

const mapStateToProps = (_state, props) => props;

const mapDispatchToProps = dispatch => ({
  updateNote: payload => {
    if (payload.title !== undefined || payload.content !== undefined)
      dispatch(createNote(payload))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteBox);
