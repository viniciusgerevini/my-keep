import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, act, fireEvent } from '@testing-library/react';
import { updateNote, deleteNote, swapNotes } from '../redux';
import HomeGrid from './HomeGrid';
import DraggableCard from '../components/DraggableCard';

jest.mock('../components/DraggableCard', () => {
  const mockNote = jest.fn();
  return mockNote.mockImplementation((props) => <div><div>{props.children}</div></div>);
});

describe('HomeGrid container', () => {
  const mockStore = configureStore();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders notes from state', () => {
    const note1 = { id: 'note1', title: 'some note' };
    const note2 = { id: 'note2', title: 'some other note' };
    const store = mockStore({
      notes: [ note1, note2 ]
    });
    const { getByText } = render(<Provider store={store}><HomeGrid /></Provider>);

    expect(getByText(note1.title)).toBeInTheDocument();
    expect(getByText(note2.title)).toBeInTheDocument();
  });

  it('trigger swap notes', () => {
    const note1 = { id: 'note1', title: 'some note' };
    const store = mockStore({
      notes: [ note1 ]
    });

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
    const store = mockStore({
      notes: [ note1 ]
    });

    const { getByLabelText, getByText } = render(<Provider store={store}><HomeGrid /></Provider>);

    fireEvent.click(getByLabelText(/More actions/i));
    fireEvent.click(getByText(/Delete note/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(deleteNote.toString());
    expect(action.payload).toEqual(note1.id);
  });

  it('trigger update note', () => {
    const note1 = { id: 'note1', title: 'some note' };
    const store = mockStore({
      notes: [ note1 ]
    });
    const { getByText } = render(<Provider store={store}><HomeGrid /></Provider>);

    act(() => {
      DraggableCard.mock.calls[0][0].onClick();
    });

    fireEvent.click(getByText(/close/i));

    const action = store.getActions()[0];

    expect(action.type).toEqual(updateNote.toString());
    expect(action.payload).toEqual(note1);
  });
});

