import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NoteBox from './NoteBox';

describe('NoteBox component', () => {
  const stubUpdateNote = jest.fn();

  beforeEach(function() {
    jest.clearAllMocks();
  });

  it('renders placeholder by default', () => {
    const { getByText } = render(<NoteBox updateNote={stubUpdateNote}/>);
    expect(getByText(/Take a note/i)).toBeInTheDocument();
  });

  it('does not render title and actions by default', () => {
    const { queryByLabelText } = render(<NoteBox updateNote={stubUpdateNote}/>);
    expect(queryByLabelText(/title/i)).toBeNull();
    expect(queryByLabelText(/actions/i)).toBeNull();
  });

  it('shows title and actions on click', () => {
    const { container, getByLabelText } = render(<NoteBox updateNote={stubUpdateNote}/>);
    const box = container.firstChild;

    fireEvent.click(box);

    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/actions/i)).toBeInTheDocument();
  });

  it('hides title and actions when clicked outside box', () => {
    const { container, queryByLabelText, getByLabelText } = render(<NoteBox updateNote={stubUpdateNote}/>);
    const box = container.firstChild;

    fireEvent.click(box);

    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/actions/i)).toBeInTheDocument();

    fireEvent.mouseDown(container);

    expect(queryByLabelText(/title/i)).toBeNull();
    expect(queryByLabelText(/actions/i)).toBeNull();
  });

  it('calls update note callback when clicked outside box', () => {
    const { container } = render(<NoteBox updateNote={stubUpdateNote}/>);
    const box = container.firstChild;

    fireEvent.click(box);
    fireEvent.mouseDown(container);

    expect(stubUpdateNote).toHaveBeenCalled();
  });

  it('does not call update note callback when clicked outside but box was never clicked before', () => {
    const { container } = render(<NoteBox updateNote={stubUpdateNote}/>);

    fireEvent.mouseDown(container);

    expect(stubUpdateNote).not.toHaveBeenCalled();
  });

  it('calls update note callback when close button is clicked', () => {
    const { container, getByLabelText } = render(<NoteBox updateNote={stubUpdateNote}/>);
    const box = container.firstChild;

    fireEvent.click(box);
    fireEvent.click(getByLabelText(/close/i));

    expect(stubUpdateNote).toHaveBeenCalled();
  });
});
