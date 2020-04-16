import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotesGridCard from '../components/NotesGridCard';

import dnd from '../helpers/useDragAndDrop';

jest.mock('../helpers/useDragAndDrop', () => {
  return {
    useDragAndDrop: jest.fn().mockReturnValue({ isDragging: false })
  }
});

describe('NotesGridCard component', () => {
  const fakeSwapNotes = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders component', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const { getByText } = render(<NotesGridCard note={note} index={0} swapNotes={fakeSwapNotes}/>);

    expect(getByText(note.title)).toBeInTheDocument();
    expect(getByText(note.content)).toBeInTheDocument();
  });

  it('renders without title', () => {
    const note = { id: '123', content: 'bla'};
    const { getByText } = render(<NotesGridCard note={note} index={0} swapNotes={fakeSwapNotes}/>);

    expect(getByText(note.content)).toBeInTheDocument();
  });

  it('calls swapNotes when drag happens', () => {
    const note = { id: '123', title: 'hello', content: 'bla', sortOrder: 2 };
    const note2 = { id: 'abc', title: 'hello2', content: 'bla2', sortOrder: 3 };
    const fakeMonitor = { getClientOffset: () => ({}) };
    render(<NotesGridCard note={note} swapNotes={fakeSwapNotes}/>);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    hover(note2, fakeMonitor);

    expect(fakeSwapNotes).toHaveBeenCalledWith(note2.id, note.id);
  })

  it('shows menu when menu icon is pressed', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const { getByTitle, getByText } = render(<NotesGridCard note={note} index={0} swapNotes={fakeSwapNotes}/>);

    fireEvent.click(getByTitle('More'));

    expect(getByText("Delete note")).toBeInTheDocument();
  });

  it('toggles menu when clicked menu icon', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const { getByTitle, queryByText } = render(<NotesGridCard note={note} index={0} swapNotes={fakeSwapNotes}/>);

    fireEvent.click(getByTitle('More'));
    fireEvent.click(getByTitle('More'));

    expect(queryByText("Delete note")).toBeNull();
  });

  it('hides menu when clicked outside element', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const { getByTitle, queryByText, container } = render(<NotesGridCard note={note} index={0} swapNotes={fakeSwapNotes}/>);

    fireEvent.click(getByTitle('More'));
    fireEvent.mouseDown(container);

    expect(queryByText("Delete note")).toBeNull();
  });

  it('triggers delete when menu delete is clicked', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const deleteNoteStub = jest.fn();
    const { getByTitle, getByText } = render(<NotesGridCard note={note} index={0} deleteNote={deleteNoteStub} swapNotes={fakeSwapNotes}/>);

    fireEvent.click(getByTitle('More'));
    fireEvent.click(getByText("Delete note"));

    expect(deleteNoteStub).toHaveBeenCalledWith(note.id);
  });

  it('triggers duplicate when menu "Duplicate note" is clicked', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const duplicateNoteStub = jest.fn();
    const { getByTitle, getByText } = render(
      <NotesGridCard
        note={note}
        index={0}
        duplicateNote={duplicateNoteStub}
        swapNotes={fakeSwapNotes}/>
    );

    fireEvent.click(getByTitle('More'));
    fireEvent.click(getByText("Duplicate note"));

    expect(duplicateNoteStub).toHaveBeenCalledWith(note);
  });

  it('does not show pin icon if pinNote action not provided', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const { queryByLabelText } = render(
      <NotesGridCard
        note={note}
        index={0}
        swapNotes={fakeSwapNotes}/>
    );

    expect(queryByLabelText(/Pin note/i)).toBeNull();
  });

  it('triggers pin note when pin icon is clicked', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const pinNoteStub = jest.fn();
    const { getByLabelText } = render(
      <NotesGridCard
        note={note}
        index={0}
        togglePinNote={pinNoteStub}
        swapNotes={fakeSwapNotes}/>
    );

    fireEvent.click(getByLabelText(/Pin note/i));

    expect(pinNoteStub).toHaveBeenCalledWith(note.id);
  });

  it('shows unpin not when note is pinned', () => {
    const note = { id: '123', title: 'hello', content: 'bla', isPinned: true };
    const pinNoteStub = jest.fn();
    const { getByLabelText } = render(
      <NotesGridCard
        note={note}
        index={0}
        togglePinNote={pinNoteStub}
        swapNotes={fakeSwapNotes}/>
    );

    fireEvent.click(getByLabelText(/Unpin note/i));

    expect(pinNoteStub).toHaveBeenCalledWith(note.id);
  });

  it('triggers archive note when archive option clicked', () => {
    const note = { id: '123', title: 'hello', content: 'bla'};
    const archiveNoteStub = jest.fn();
    const { getByLabelText } = render(
      <NotesGridCard
        note={note}
        index={0}
        archiveNote={archiveNoteStub}
        swapNotes={fakeSwapNotes}/>
    );

    fireEvent.click(getByLabelText(/Archive note/i));

    expect(archiveNoteStub).toHaveBeenCalledWith(note.id);
  });

  it('triggers unarchive note when unarchive option is clicked', () => {
    const note = { id: '123', title: 'hello', content: 'bla', isArchived: true };
    const unarchiveNoteStub = jest.fn();
    const { getByLabelText } = render(
      <NotesGridCard
        note={note}
        index={0}
        unarchiveNote={unarchiveNoteStub}
        swapNotes={fakeSwapNotes}/>
    );

    fireEvent.click(getByLabelText(/Unarchive note/i));

    expect(unarchiveNoteStub).toHaveBeenCalledWith(note.id);
  });
});
