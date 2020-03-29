import { createAction, createReducer } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

export const createNote = createAction('my-keep/notes/CREATE');
export const swapNotes = createAction('my-keep/notes/SWAP_NOTES_POSITION');

const createNoteReducer = (state, action) => {
  const note = {
    id: uuid(),
    ...action.payload
  };

  return [note].concat(state);
};

const swapNotesReducer = (state, action) => {
  [state[action.payload.src], state[action.payload.dest]] = [state[action.payload.dest], state[action.payload.src]];
  return state;
};

const noteReducers = createReducer([], {
  [createNote]: createNoteReducer,
  [swapNotes]: swapNotesReducer
});

export default noteReducers;
