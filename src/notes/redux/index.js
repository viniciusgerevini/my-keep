import { createAction, createReducer } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

export const createNote = createAction('my-keep/notes/CREATE');
export const updateNote = createAction('my-keep/notes/UPDATE');
export const deleteNote = createAction('my-keep/notes/DELETE');
export const swapNotes = createAction('my-keep/notes/SWAP_NOTES_POSITION');

export function createEmptyState() {
  return {
    notes: [],
    pinnedNotes: []
  };
}

const createNoteReducer = (state, action) => {
  const note = {
    id: uuid(),
    ...action.payload
  };

  state.notes = [note].concat(state.notes);

  return state;
};

const updateNoteReducer = (state, action) => {
  const note = state.notes.find(n => n.id === action.payload.id);
  if (note) {
    Object.assign(note, action.payload);
  }
  return state;
};

const deleteNoteReducer = (state, action) => {
  state.notes = state.notes.filter( note => note.id !== action.payload);
  return state;
};

const swapNotesReducer = (state, action) => {
  [state.notes[action.payload.src], state.notes[action.payload.dest]] = [state.notes[action.payload.dest], state.notes[action.payload.src]];
  return state;
};

const noteReducers = createReducer(createEmptyState(), {
  [createNote]: createNoteReducer,
  [updateNote]: updateNoteReducer,
  [deleteNote]: deleteNoteReducer,
  [swapNotes]: swapNotesReducer,
});

export default noteReducers;
