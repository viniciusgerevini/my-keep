import React from 'react';
import { render, fireEvent, getByLabelText } from '@testing-library/react';
import App from './App';
import { saveState } from './storage/local-storage';

jest.mock('./storage/local-storage', () => {
  const persistedState = {
    notes: {
      items: [
        { id: 'somePersistedNote', title: 'some persisted note' }
      ]
    }
  };

  return {
    loadState: jest.fn().mockReturnValue(persistedState),
    saveState: jest.fn()
  }
});

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders app', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/MyKeep/i);
    expect(linkElement).toBeInTheDocument();
  });

  describe('Sidebar', () => {
    it('does not render sidebar on startup', () => {
      const { queryByLabelText } = render(<App />);
      expect(queryByLabelText("Sidebar")).toBeNull();
    });

    it('opens sidebar when toggle sidebar button is clicked', () => {
      const { getByLabelText } = render(<App />);
      fireEvent.click(getByLabelText(/Sidebar Toggle Button/g));
      expect(getByLabelText("Sidebar")).toBeInTheDocument();
    });

    it('closes sidebar when toggle button is clicked and sidebar was already open', () => {
      const { getByLabelText, queryByLabelText } = render(<App />);
      const toggleButton = getByLabelText(/Sidebar Toggle Button/g);
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      expect(queryByLabelText("Sidebar")).toBeNull();
    });
  });

  describe('local storage', () => {
    it('loads state from storage on startup', () => {
      const { getByText } = render(<App />);
      expect(getByText('some persisted note')).toBeInTheDocument();
    });

    it('persists notes on change', () => {
      const { container, getByText } = render(<App />);

      fireEvent.click(getByText(/take a note/i));
      const noteBox = getByLabelText(container, /note editor/i);
      getByLabelText(noteBox, /title/i).value = 'hello';
      fireEvent.click(getByLabelText(noteBox, /close/i));

      expect(saveState).toHaveBeenCalledWith({
        notes: {
          items: expect.arrayContaining([
            expect.objectContaining({ title: 'hello' }),
            expect.objectContaining({ title: 'some persisted note' })
          ])
        }
      });
    });
  });
});
