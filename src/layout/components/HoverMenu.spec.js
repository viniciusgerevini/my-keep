import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HoverMenu from './HoverMenu';


describe('HoverMenu content', () => {
  it('renders entries', () => {
    const items = [{ text: 'Delete' }, { text: 'SomeOption' }];

    const { getByText } = render(<HoverMenu ref={React.createRef()} items={items} />);

    expect(getByText(items[0].text)).toBeInTheDocument();
    expect(getByText(items[1].text)).toBeInTheDocument();
  });

  it('calls entry action on click', () => {
    const items = [
      { text: 'Delete', action: jest.fn() },
      { text: 'SomeOption' }
    ];

    const { getByText } = render(<HoverMenu ref={React.createRef()} items={items} />);

    fireEvent.click(getByText(items[0].text));

    expect(items[0].action).toHaveBeenCalled();
  });
});

