import { createAction, createReducer } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

export const createNote = createAction('my-keep/notes/CREATE');
export const updateNote = createAction('my-keep/notes/UPDATE');
export const deleteNote = createAction('my-keep/notes/DELETE');
export const swapNotes = createAction('my-keep/notes/SWAP_NOTES_POSITION');
export const pinNote = createAction('my-keep/notes/PIN_NOTE');

export function createEmptyState() {
  return [];
}

const createNoteReducer = (state, action) => {
  const note = {
    id: uuid(),
    ...action.payload
  };

  return [note].concat(state);
};

const updateNoteReducer = (state, action) => {
  const note = state.find(n => n.id === action.payload.id);
  if (note) {
    Object.assign(note, action.payload);
  }
  return state;
};

const deleteNoteReducer = (state, action) => {
  return state.filter( note => note.id !== action.payload)
};

const swapNotesReducer = (state, action) => {
  [state[action.payload.src], state[action.payload.dest]] = [state[action.payload.dest], state[action.payload.src]];
  return state;
};

const pinNoteReducer = (state, action) => {
  const note = state.find(n => n.id === action.payload);
  note.isPinned = true;
  return state;
};


const noteReducers = createReducer(createEmptyState(), {
  [createNote]: createNoteReducer,
  [updateNote]: updateNoteReducer,
  [deleteNote]: deleteNoteReducer,
  [swapNotes]: swapNotesReducer,
  [pinNote]: pinNoteReducer,
});

export default noteReducers;
