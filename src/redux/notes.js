import { createAction, createReducer } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

export const createNote = createAction('my-keep/notes/CREATE');
export const updateNote = createAction('my-keep/notes/UPDATE');
export const deleteNote = createAction('my-keep/notes/DELETE');
export const swapNotes = createAction('my-keep/notes/SWAP_NOTES_POSITION');
export const pinNote = createAction('my-keep/notes/PIN_NOTE');
export const unpinNote = createAction('my-keep/notes/UNPIN_NOTE');
export const archiveNote = createAction('my-keep/notes/ARCHIVE_NOTE');
export const unarchiveNote = createAction('my-keep/notes/UNARCHIVE_NOTE');

export function createEmptyState() {
  return {
    items: [],
    archive: []
  };
}

const createNoteReducer = (state, action) => {
  const note = {
    ...action.payload,
    id: uuid(),
    sortOrder: Date.now(),
    lastUpdateAt: Date.now(),
    createdAt: Date.now()
  };

  state.items = state.items.concat(note);

  return state;
};

const updateNoteReducer = (state, action) => {
  const note = state.items.find(n => n.id === action.payload.id);
  if (note) {
    Object.assign(note, action.payload, { lastUpdateAt: Date.now() });
  }
  return state;
};

const deleteNoteReducer = (state, action) => {
  state.items = state.items.filter( note => note.id !== action.payload)
  return state;
};

const swapNotesReducer = (state, action) => {
  const note1 = state.items.find(n => n.id === action.payload.src);
  const note2 = state.items.find(n => n.id === action.payload.dest);

  const firstOrder = note1.sortOrder;
  note1.sortOrder = note2.sortOrder;
  note2.sortOrder = firstOrder;

  return state;
};

const pinNoteReducer = (state, action) => {
  const note = state.items.find(n => n.id === action.payload);
  note.isPinned = true;
  return state;
};

const unpinNoteReducer = (state, action) => {
  const note = state.items.find(n => n.id === action.payload);
  note.isPinned = false;
  return state;
};

const archiveNoteReducer = (state, action) => {
  const index = state.items.findIndex(n => n.id === action.payload);

  if (index === -1) {
    return state;
  }

  const note = state.items.splice(index, 1);
  state.archive = state.archive.concat(note);
  return state;
};

const unarchiveNoteReducer = (state, action) => {
  const index = state.archive.findIndex(n => n.id === action.payload);

  if (index === -1) {
    return state;
  }

  const note = state.archive.splice(index, 1);
  state.items = state.items.concat(note);
  return state;
};

const noteReducers = createReducer(createEmptyState(), {
  [createNote]: createNoteReducer,
  [updateNote]: updateNoteReducer,
  [deleteNote]: deleteNoteReducer,
  [swapNotes]: swapNotesReducer,
  [pinNote]: pinNoteReducer,
  [unpinNote]: unpinNoteReducer,
  [archiveNote]: archiveNoteReducer,
  [unarchiveNote]: unarchiveNoteReducer,
});

export default noteReducers;
