import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';


describe('App', () => {
  it('renders app', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/MyKeep/i);
    expect(linkElement).toBeInTheDocument();
  });

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
