import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, act, fireEvent } from '@testing-library/react';
import {
  createNote,
  updateNote,
  deleteNote,
  swapNotes,
  pinNote,
  unpinNote,
  createEmptyState,
} from '../redux/notes';
import HomeGrid from './HomeGrid';
import DraggableCard from '../components/DraggableCard';

jest.mock('../components/DraggableCard', () => {
  const mockNote = jest.fn();
  return mockNote.mockImplementation((props) => <div><div>{props.children}</div></div>);
});

describe('HomeGrid container', () => {
  const mockStore = configureStore();

  const createMockStore = (notes = []) => {
    const store = mockStore({
      notes: createEmptyState().concat(notes)
    });
    return store;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders notes from state', () => {
    const note1 = { id: 'note1', title: 'some note' };
    const note2 = { id: 'note2', title: 'some other note' };
    const store = createMockStore([ note1, note2 ]);
    const { getByText } = render(<Provider store={store}><HomeGrid /></Provider>);

    expect(getByText(note1.title)).toBeInTheDocument();
    expect(getByText(note2.title)).toBeInTheDocument();
  });

  it('renders notes from state sorted by reversed sortOrder', () => {
    const note1 = { id: 'note1', title: 'some note', sortOrder: 1 };
    const note2 = { id: 'note2', title: 'some other note', sortOrder: 2 };
    const store = createMockStore([ note1, note2 ]);
    render(<Provider store={store}><HomeGrid /></Provider>);

    expect(DraggableCard.mock.calls[0][0].item).toEqual(note2);
    expect(DraggableCard.mock.calls[1][0].item).toEqual(note1);
  });

  it('renders pinned notes', () => {
    const note1 = { id: 'note1', title: 'some note', isPinned: true };
    const note2 = { id: 'note2', title: 'some other note' };
    const store = createMockStore([ note1, note2 ]);
    const { getByText } = render(<Provider store={store}><HomeGrid /></Provider>);

    expect(getByText(note1.title)).toBeInTheDocument();
    expect(getByText(note2.title)).toBeInTheDocument();
  });

  it('trigger swap notes', () => {
    const note1 = { id: 'note1', title: 'some note' };
    const store = createMockStore([ note1 ]);

    render(<Provider store={store}><HomeGrid /></Provider>);

    act(() => {
      DraggableCard.mock.calls[0][0].onDrop(1, 2);
    });

    const action = store.getActions()[0];

    expect(action.type).toEqual(swapNotes.toString());
    expect(action.payload).toEqual({ src: 1, dest: 2 });
  });

  it('trigger delete note', () => {
    const note1 = { id: 'note1', title: 'some note' };
    const store = createMockStore([ note1 ]);

    const { getByLabelText, getByText } = render(<Provider store={store}><HomeGrid /></Provider>);

    fireEvent.click(getByLabelText(/More actions/i));
    fireEvent.click(getByText(/Delete note/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(deleteNote.toString());
    expect(action.payload).toEqual(note1.id);
  });

  it('trigger update note', () => {
    const note1 = { id: 'note1', title: 'some note' };
    const store = createMockStore([ note1 ]);
    const { getByText } = render(<Provider store={store}><HomeGrid /></Provider>);

    act(() => {
      DraggableCard.mock.calls[0][0].onClick();
    });

    fireEvent.click(getByText(/close/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(updateNote.toString());
    expect(action.payload).toEqual(note1);
  });

  it('triggers create note with note info', () => {
    const note1 = { id: 'note1', title: 'some note', content: 'some content' };
    const store = createMockStore([ note1 ]);

    const { getByLabelText, getByText } = render(<Provider store={store}><HomeGrid /></Provider>);

    fireEvent.click(getByLabelText(/More actions/i));
    fireEvent.click(getByText(/Duplicate note/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(createNote.toString());
    expect(action.payload).toEqual({ title: note1.title, content: note1.content });
  });

  it('triggers pin note', () => {
    const note1 = { id: 'note1', title: 'some note' };
    const store = createMockStore([ note1 ]);

    const { getByLabelText } = render(<Provider store={store}><HomeGrid /></Provider>);

    fireEvent.click(getByLabelText(/Pin note/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(pinNote.toString());
    expect(action.payload).toEqual(note1.id);
  });

  it('triggers pin note', () => {
    const note1 = { id: 'note1', title: 'some note', isPinned: true };
    const store = createMockStore([ note1 ]);

    const { getByLabelText } = render(<Provider store={store}><HomeGrid /></Provider>);

    fireEvent.click(getByLabelText(/Unpin note/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(unpinNote.toString());
    expect(action.payload).toEqual(note1.id);
  });
});

