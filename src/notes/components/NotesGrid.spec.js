import React from 'react';
import { render } from '@testing-library/react';

import NotesGrid from './NotesGrid';

describe('NotesGrid component', () => {
  it('renders notes', () => {
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];

    const { getByLabelText } = render(<NotesGrid notes={notes}/>);

    expect(getByLabelText(/title/i).textContent).toEqual(notes[0].title);
    expect(getByLabelText(/content/i).textContent).toEqual(notes[0].content);
  });

  it('caculates notes height for grid', () => {
    const notes = [
      { id: 'abc', title: 'hello', content: 'something' }
    ];
    const { container } = render(<NotesGrid notes={notes}/>);
    const note = container.firstChild.firstChild

    expect(note.style.gridRowEnd).toEqual("span 1");
  });
});
