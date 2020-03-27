import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import NoteBox from './NoteBox';

describe('NoteEditor', () => {
  it('renders content field by default', () => {
    const { getByLabelText } = render(<NoteBox />);
    expect(getByLabelText(/content/i)).toBeInTheDocument();
  });

  it('does not render title and actions by default', () => {
    const { queryByLabelText } = render(<NoteBox />);
    expect(queryByLabelText(/title/i)).toBeNull();
    expect(queryByLabelText(/actions/i)).toBeNull();
  });

  it('shows title and actions on click', () => {
    const { container, getByLabelText } = render(<NoteBox />);
    const box = container.firstChild;

    fireEvent.click(box);

    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/actions/i)).toBeInTheDocument();
  });

  it('hides title and actions when clicked outside box', () => {
    const { container, queryByLabelText, getByLabelText } = render(<NoteBox updateNote={()=>{}}/>);
    const box = container.firstChild;

    fireEvent.click(box);

    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/actions/i)).toBeInTheDocument();

    fireEvent.mouseDown(container);

    expect(queryByLabelText(/title/i)).toBeNull();
    expect(queryByLabelText(/actions/i)).toBeNull();
  });

  it('calls update note callback when clicked outside box', () => {
    const updateCallbackStub = jest.fn();
    const { container } = render(<NoteBox updateNote={updateCallbackStub}/>);
    const box = container.firstChild;

    fireEvent.click(box);
    fireEvent.mouseDown(container);

    expect(updateCallbackStub).toHaveBeenCalled();
  });

  it('does not call update note callback when clicked outside but box was never clicked before', () => {
    const updateCallbackStub = jest.fn();
    const { container } = render(<NoteBox updateNote={updateCallbackStub}/>);

    fireEvent.mouseDown(container);

    expect(updateCallbackStub).not.toHaveBeenCalled();
  });

  it('calls update note callback when close button is clicked', () => {
    const updateCallbackStub = jest.fn();
    const { container, getByLabelText } = render(<NoteBox updateNote={updateCallbackStub}/>);
    const box = container.firstChild;

    fireEvent.click(box);
    fireEvent.click(getByLabelText(/close/i));

    expect(updateCallbackStub).toHaveBeenCalled();
  });
});
