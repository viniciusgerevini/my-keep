import { createAction, createReducer } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

export const createNote = createAction('my-keep/notes/CREATE')

const createNoteReducer = (state, action) => {
  const note = {
    id: uuid(),
    ...action.payload
  };

  return [note].concat(state);
};

const noteReducers = createReducer([], {
  [createNote]: createNoteReducer
});

export default noteReducers;
