import React from 'react';
import { render } from '@testing-library/react';

import MainNotesGrid from './MainNotesGrid';

describe('MainNotesGrid component', () => {
  // renders ntoes
  // renders pinned notes
  // triggers pin note when pin clicked on note from notes list
  // triggers unpin note when pin clicked on note from pinned notes list
  // shows labels when pinned notes available
  // does not show label when no pinned notes available
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
});
