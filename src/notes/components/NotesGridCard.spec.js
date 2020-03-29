import React from 'react';
import { render } from '@testing-library/react';
import NotesGridCard from '../components/NotesGridCard';
import dnd from '../helpers/useDragAndDrop';

jest.mock('../helpers/useDragAndDrop', () => {
  return {
    useDragAndDrop: jest.fn().mockReturnValue({ isDragging: false })
  }
});

describe('NotesGridCard component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders component', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const { getByText } = render(<NotesGridCard note={note} />);

    expect(getByText(note.title)).toBeInTheDocument();
    expect(getByText(note.content)).toBeInTheDocument();
  });

  it('renders without title', () => {
    const note = { id: '123', content: 'bla'};
    const { getByText } = render(<NotesGridCard note={note} />);

    expect(getByText(note.content)).toBeInTheDocument();
  });

  it('calls swapNotes when drag happens', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const fakeSwapNotes = jest.fn();
    const firstNoteIndex = 1;
    const secondNoteIndex = 2;
    const fakeMonitor = { getClientOffset: () => ({}) };
    render(<NotesGridCard index={firstNoteIndex} note={note} swapNotes={fakeSwapNotes} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    hover({ index: secondNoteIndex }, fakeMonitor);

    expect(fakeSwapNotes).toHaveBeenCalledWith(secondNoteIndex, firstNoteIndex);
  })

  it('changes item index when drag happens', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const fakeSwapNotes = jest.fn();
    const firstNoteIndex = 1;
    const secondNoteIndex = 2;
    const fakeMonitor = { getClientOffset: () => ({}) };
    render(<NotesGridCard index={firstNoteIndex} note={note} swapNotes={fakeSwapNotes} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    const targetItem = { index: secondNoteIndex }
    hover(targetItem, fakeMonitor);

    expect(targetItem.index).toEqual(firstNoteIndex);
  });

  it('does not trigger swapNotes if target and source index are the same', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const fakeSwapNotes = jest.fn();
    const firstNoteIndex = 1;
    const secondNoteIndex = 1;
    const fakeMonitor = { getClientOffset: () => ({}) };
    render(<NotesGridCard index={firstNoteIndex} note={note} swapNotes={fakeSwapNotes} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    const targetItem = { index: secondNoteIndex }
    hover(targetItem, fakeMonitor);

    expect(fakeSwapNotes).not.toHaveBeenCalled();
  });

  it('does not trigger swapNotes if drag not activated downwards', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const fakeSwapNotes = jest.fn();
    const firstNoteIndex = 1;
    const secondNoteIndex = 2;
    const fakeMonitor = { getClientOffset: () => ({ y: 1000 }) };
    render(<NotesGridCard index={firstNoteIndex} note={note} swapNotes={fakeSwapNotes} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    const targetItem = { index: secondNoteIndex }
    hover(targetItem, fakeMonitor);

    expect(fakeSwapNotes).not.toHaveBeenCalled();
  });

  it('does not trigger swapNotes if drag not activated upwards', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const fakeSwapNotes = jest.fn();
    const firstNoteIndex = 2;
    const secondNoteIndex = 1;
    const fakeMonitor = { getClientOffset: () => ({ y: -1000 }) };
    render(<NotesGridCard index={firstNoteIndex} note={note} swapNotes={fakeSwapNotes} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    const targetItem = { index: secondNoteIndex }
    hover(targetItem, fakeMonitor);

    expect(fakeSwapNotes).not.toHaveBeenCalled();
  });

  it('changes oppacity when item is being dragged', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};

    dnd.useDragAndDrop.mockReturnValue({ isDragging: true });

    const { container } = render(<NotesGridCard index={1} note={note} />);
    const noteCard = container.firstChild;

    expect(noteCard.style.opacity).toEqual("0");
  });

});
