import {createAction, createReducer} from "@reduxjs/toolkit";

export const createNote = createAction('my-keep/notes/CREATE')

const createNoteReducer = (state, action) => {
  return state.concat(action.payload);
};

const noteReducers = createReducer([], {
  [createNote]: createNoteReducer
});

export default noteReducers;
