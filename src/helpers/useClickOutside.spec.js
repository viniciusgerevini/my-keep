import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';

import { useClickOutside } from "./useClickOutside";

function TestComponent(props) {
  const ref = useRef(null);
  const { callback } = props;

  useClickOutside(ref, callback);

  return(<div ref={ref}>Test</div>);
}

describe('useClickOutside helper', () => {
  it('calls callback when clicked outside element', () => {
    const updateCallbackStub = jest.fn();
    const { container } = render(<TestComponent callback={updateCallbackStub}/>);

    fireEvent.mouseDown(container);

    expect(updateCallbackStub).toHaveBeenCalled();
  });

  it('does not call when element is clicked', () => {
    const updateCallbackStub = jest.fn();
    const { container } = render(<TestComponent callback={updateCallbackStub}/>);
    const box = container.firstChild;

    fireEvent.mouseDown(box);

    expect(updateCallbackStub).not.toHaveBeenCalled();
  });
});
