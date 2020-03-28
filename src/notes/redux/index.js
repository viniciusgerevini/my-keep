export const CREATE = 'my-keep/notes/CREATE';

export const createNote = (payload) => ({
  type: CREATE,
  payload
});

const defaultReducer = state => state;

const createNoteReducer = (state, action) => {
  return state.concat(action.payload);
};

const reducers = {
  [CREATE]: createNoteReducer
};

const noteReducers = (state = [], action) =>
  (reducers[action.type] || defaultReducer)(state, action);

export default noteReducers;
