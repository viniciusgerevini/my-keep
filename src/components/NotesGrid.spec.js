import React from 'react';
import { render } from '@testing-library/react';
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import NotesGrid from './NotesGrid';

describe('NotesGrid component', () => {
  const noop = () => {};

  const renderComponent = ({ notes, deleteNote, swapNotes, updateNote, duplicateNote, ...props }) => {
    return render(
      <DndProvider backend={Backend}>
        <NotesGrid
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

  it('caculates notes height for grid', () => {
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];

    const { getByLabelText } = renderComponent({ notes });

    const note = getByLabelText('note');

    expect(note.style.gridRowEnd).toEqual("span 1");
  });
});
