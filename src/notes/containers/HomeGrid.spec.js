import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import HomeGrid from './HomeGrid';

describe('HomeGrid container', () => {
  const mockStore = configureStore();

  it('renders notes from state', () => {
    const note1 = { id: 'note1', title: 'some note' };
    const note2 = { id: 'note2', title: 'some other note' };
    const store = mockStore({
      notes: [ note1, note2 ]
    });
    const { getByText } = render(<Provider store={store}><HomeGrid /></Provider>);

    expect(getByText(note1.title)).toBeInTheDocument();
    expect(getByText(note2.title)).toBeInTheDocument();
  });
});

