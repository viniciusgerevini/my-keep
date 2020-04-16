import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, act, fireEvent } from '@testing-library/react';
import {
  createNote,
  updateNote,
  deleteNote,
  swapNotes,
  createEmptyState,
  unarchiveNote
} from '../redux/notes';
import ArchiveGrid from './ArchiveGrid';
import DraggableCard from '../components/DraggableCard';

jest.mock('../components/DraggableCard', () => {
  const mockNote = jest.fn();
  return mockNote.mockImplementation((props) => <div><div>{props.children}</div></div>);
});

describe('ArchiveGrid container', () => {
  const mockStore = configureStore();

  const createMockStore = (notes = []) => {
    let state = createEmptyState();
    return mockStore({ notes: state.concat(notes) });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders notes from archive', () => {
    const note1 = { id: 'note1', title: 'some note' };
    const note2 = { id: 'note2', title: 'some other note', isArchived: true };
    const store = createMockStore([ note1, note2 ]);
    const { getByText, queryByText } = render(<Provider store={store}><ArchiveGrid /></Provider>);

    expect(queryByText(note1.title)).toBeNull();
    expect(getByText(note2.title)).toBeInTheDocument();
  });

  it('renders notes from state sorted by reversed sortOrder', () => {
    const note1 = { id: 'note1', title: 'some note', sortOrder: 1,  isArchived: true };
    const note2 = { id: 'note2', title: 'some other note', sortOrder: 2,  isArchived: true };
    const store = createMockStore([ note1, note2 ]);
    render(<Provider store={store}><ArchiveGrid /></Provider>);

    expect(DraggableCard.mock.calls[0][0].item).toEqual(note2);
    expect(DraggableCard.mock.calls[1][0].item).toEqual(note1);
  });

  it('trigger swap notes', () => {
    const note1 = { id: 'note1', title: 'some note', isArchived: true };
    const store = createMockStore([ note1 ]);

    render(<Provider store={store}><ArchiveGrid /></Provider>);

    act(() => {
      DraggableCard.mock.calls[0][0].onDrop(1, 2);
    });

    const action = store.getActions()[0];

    expect(action.type).toEqual(swapNotes.toString());
    expect(action.payload).toEqual({ src: 1, dest: 2 });
  });

  it('trigger delete note', () => {
    const note1 = { id: 'note1', title: 'some note', isArchived: true };
    const store = createMockStore([ note1 ]);

    const { getByLabelText, getByText } = render(<Provider store={store}><ArchiveGrid /></Provider>);

    fireEvent.click(getByLabelText(/More actions/i));
    fireEvent.click(getByText(/Delete note/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(deleteNote.toString());
    expect(action.payload).toEqual(note1.id);
  });

  it('trigger update note', () => {
    const note1 = { id: 'note1', title: 'some note', isArchived: true };
    const store = createMockStore([ note1 ]);
    const { getByText } = render(<Provider store={store}><ArchiveGrid /></Provider>);

    act(() => {
      DraggableCard.mock.calls[0][0].onClick();
    });

    fireEvent.click(getByText(/close/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(updateNote.toString());
    expect(action.payload).toEqual(note1);
  });

  it('triggers create note with note info on duplicate', () => {
    const note1 = { id: 'note1', title: 'some note', content: 'some content', isArchived: true };
    const store = createMockStore([ note1 ]);

    const { getByLabelText, getByText } = render(<Provider store={store}><ArchiveGrid /></Provider>);

    fireEvent.click(getByLabelText(/More actions/i));
    fireEvent.click(getByText(/Duplicate note/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(createNote.toString());
    expect(action.payload).toEqual({ title: note1.title, content: note1.content, isArchived: true });
  });

  it('triggers unarchive note', () => {
    const note1 = { id: 'note1', title: 'some note', isArchived: true };
    const store = createMockStore([ note1 ]);

    const { getByLabelText } = render(<Provider store={store}><ArchiveGrid /></Provider>);

    fireEvent.click(getByLabelText(/Unarchive note/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(unarchiveNote.toString());
    expect(action.payload).toEqual(note1.id);
  });
});

