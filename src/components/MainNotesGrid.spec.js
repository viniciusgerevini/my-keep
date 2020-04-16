import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import MainNotesGrid from './MainNotesGrid';

describe('MainNotesGrid component', () => {
  const noop = () => {};

  const renderComponent = ({ notes, deleteNote, swapNotes, updateNote, duplicateNote, ...props }) => {
    return render(
      <DndProvider backend={Backend}>
        <MainNotesGrid
          notes={notes}
          deleteNote={deleteNote || noop}
          swapNotes={swapNotes || noop}
          updateNote={updateNote || noop}
          duplicateNote={duplicateNote || noop}
          {...props}
        />
      </DndProvider>
    );
  };

  it('renders notes', () => {
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];
    const { getByLabelText } = renderComponent({ notes });

    expect(getByLabelText(/title/i).textContent).toEqual(notes[0].title);
    expect(getByLabelText(/content/i).textContent).toEqual(notes[0].content);
  });

  it('renders pinned notes', () => {
    const notes = [];
    const pinnedNotes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];
    const { getByLabelText } = renderComponent({ notes, pinnedNotes });

    expect(getByLabelText(/title/i).textContent).toEqual(pinnedNotes[0].title);
    expect(getByLabelText(/content/i).textContent).toEqual(pinnedNotes[0].content);
  });

  it('triggers pin note', () => {
    const pinNoteStub = jest.fn();
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];
    const pinnedNotes = [];

    const { getByLabelText } = renderComponent({
      notes,
      pinnedNotes,
      pinNoteAction: pinNoteStub
    });

    fireEvent.click(getByLabelText(/Pin note/i));

    expect(pinNoteStub).toHaveBeenCalled();
  });

  it('triggers unpin note', () => {
    const unpinNoteStub = jest.fn();
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];
    const pinnedNotes = [
      { id: '123', title: 'hello2', isPinned: true }
    ];

    const { getByLabelText } = renderComponent({
      notes,
      pinnedNotes,
      unpinNoteAction: unpinNoteStub
    });

    fireEvent.click(getByLabelText(/Unpin note/i));

    expect(unpinNoteStub).toHaveBeenCalled();
  });

  it('shows grids labels when pinned notes available', () => {
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];
    const pinnedNotes = [
      { id: '123', title: 'hello2', isPinned: true }
    ];

    const { getByText } = renderComponent({ notes, pinnedNotes });

    expect(getByText(/Pinned/i)).toBeInTheDocument();
    expect(getByText(/Others/i)).toBeInTheDocument();
  });

  it('does not show grids labels when pinned notes not available', () => {
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];
    const pinnedNotes = [];

    const { queryByText } = renderComponent({ notes, pinnedNotes });

    expect(queryByText(/Pinned/i)).toBeNull();
    expect(queryByText(/Others/i)).toBeNull();
  });
});
