import { connect } from 'react-redux';
import NotesGrid from '../components/NotesGrid';
import { swapNotes } from '../redux';


const mapStateToProps = (state, props) => ({
  notes: state.notes,
  ...props
});

const mapDispatchToProps = dispatch => ({
  swapNotes: (src, dest) => {
      dispatch(swapNotes({src, dest}));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesGrid);
