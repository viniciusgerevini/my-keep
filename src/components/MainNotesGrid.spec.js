import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import MainNotesGrid from './MainNotesGrid';

describe('MainNotesGrid component', () => {
  const noop = () => {};

  it('renders notes', () => {
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];

    const { getByLabelText } = render(
      <MainNotesGrid
        notes={notes}
        deleteNote={noop}
        swapNotes={noop}
        updateNote={noop}
        duplicateNote={noop} />
    );

    expect(getByLabelText(/title/i).textContent).toEqual(notes[0].title);
    expect(getByLabelText(/content/i).textContent).toEqual(notes[0].content);
  });

  it('renders pinned notes', () => {
    const notes = [];
    const pinnedNotes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];

    const { getByLabelText } = render(
      <MainNotesGrid
        notes={notes}
        pinnedNotes={pinnedNotes}
        deleteNote={noop}
        swapNotes={noop}
        updateNote={noop}
        duplicateNote={noop} />
    );

    expect(getByLabelText(/title/i).textContent).toEqual(pinnedNotes[0].title);
    expect(getByLabelText(/content/i).textContent).toEqual(pinnedNotes[0].content);
  });

  it('triggers pin note', () => {
    const pinNoteStub = jest.fn();
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];
    const pinnedNotes = [];

    const { getByLabelText } = render(
      <MainNotesGrid
        notes={notes}
        pinnedNotes={pinnedNotes}
        deleteNote={noop}
        swapNotes={noop}
        updateNote={noop}
        duplicateNote={noop}
        pinNoteAction={pinNoteStub}
      />
    );

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

    const { getByLabelText } = render(
      <MainNotesGrid
        notes={notes}
        pinnedNotes={pinnedNotes}
        deleteNote={noop}
        swapNotes={noop}
        updateNote={noop}
        duplicateNote={noop}
        pinNoteAction={noop}
        unpinNoteAction={unpinNoteStub}
      />
    );

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

    const { getByText } = render(
      <MainNotesGrid
        notes={notes}
        pinnedNotes={pinnedNotes}
        deleteNote={noop}
        swapNotes={noop}
        updateNote={noop}
        duplicateNote={noop}
      />
    );

    expect(getByText(/Pinned/i)).toBeInTheDocument();
    expect(getByText(/Others/i)).toBeInTheDocument();
  });

  it('does not show grids labels when pinned notes not available', () => {
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];
    const pinnedNotes = [];

    const { queryByText } = render(
      <MainNotesGrid
        notes={notes}
        pinnedNotes={pinnedNotes}
        deleteNote={noop}
        swapNotes={noop}
        updateNote={noop}
        duplicateNote={noop}
      />
    );

    expect(queryByText(/Pinned/i)).toBeNull();
    expect(queryByText(/Others/i)).toBeNull();
  });
});
