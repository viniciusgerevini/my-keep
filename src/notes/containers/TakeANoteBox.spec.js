import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';
import { createNote } from '../redux';
import TakeANoteBox from './TakeANoteBox';

describe('TakeANoteBox container', () => {
  const mockStore = configureStore();

  it('renders component', () => {
    const store = mockStore({});
    const { getByText } = render(<Provider store={store}><TakeANoteBox /></Provider>);
    expect(getByText(/Take a note/i)).toBeInTheDocument();
  });

  it('dispatches "create note" action when close triggered and at least one field has value', () => {
    const store = mockStore({});
    const expectedAction = createNote({ title: 'hello' });
    const { container, getByLabelText } = render(<Provider store={store}><TakeANoteBox /></Provider>);
    const box = container.firstChild.firstChild;

    fireEvent.click(box);
    getByLabelText(/title/i).value = 'hello';
    fireEvent.click(getByLabelText(/close/i));

    expect(store.getActions()).toEqual([expectedAction]);
  });

  it('does not dispatch "create note" action when fields are undefined', () => {
    const store = mockStore({});
    const { container, getByLabelText } = render(<Provider store={store}><TakeANoteBox /></Provider>);
    const box = container.firstChild.firstChild;

    fireEvent.click(box);
    fireEvent.click(getByLabelText(/close/i));

    expect(store.getActions()).toEqual([]);
  });
});

