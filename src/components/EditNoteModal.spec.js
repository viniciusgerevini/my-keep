import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditNoteModal from './EditNoteModal';

describe('EditNoteModal component', () => {
  const note = { id: '123', title: 'hello', content: '<p>bla</p>'};

  it('renders fields', () => {
    const { getByLabelText } = render(<EditNoteModal note={note}  onModalClose={() => {}}/>);

    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/content/i)).toBeInTheDocument();
  });

  it('calls onModalClose callback when close button is clicked', () => {
    const closeCallbackStub = jest.fn();
    const { getByLabelText } = render(<EditNoteModal note={note} onModalClose={closeCallbackStub}/>);

    fireEvent.click(getByLabelText(/close/i));

    expect(closeCallbackStub).toHaveBeenCalled();
  });

  it('calls onModalClose callback when clicked background', () => {
    const closeCallbackStub = jest.fn();
    const { container } = render(<EditNoteModal note={note} onModalClose={closeCallbackStub}/>);
    const background = container.firstChild.lastChild;

    fireEvent.click(background);

    expect(closeCallbackStub).toHaveBeenCalled();
  });

  it('does not close when box is clicked', () => {
    const closeCallbackStub = jest.fn();
    const { container } = render(<EditNoteModal note={note} onModalClose={closeCallbackStub}/>);
    const box = container.firstChild.firstChild;

    fireEvent.click(box);

    expect(closeCallbackStub).not.toHaveBeenCalled();
  });


  it('calls updateNote when closed', () => {
    const updateNoteCallback = jest.fn();
    const closeCallbackStub = jest.fn();
    const { getByLabelText } = render(<EditNoteModal note={note} updateNote={updateNoteCallback} onModalClose={closeCallbackStub}/>);

    fireEvent.click(getByLabelText(/close/i));

    expect(updateNoteCallback).toHaveBeenCalledWith(note);
  });
});


