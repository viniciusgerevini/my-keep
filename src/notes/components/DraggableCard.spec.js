import React from 'react';
import { render } from '@testing-library/react';
import DraggableCard from '../components/DraggableCard';
import dnd from '../helpers/useDragAndDrop';

jest.mock('../helpers/useDragAndDrop', () => {
  return {
    useDragAndDrop: jest.fn().mockReturnValue({ isDragging: false })
  }
});

describe('DraggableCard component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children', () => {
    const firstCardIndex = 1;
    const { getByText } = render(<DraggableCard index={firstCardIndex}><div>someChildren</div></DraggableCard>);

    expect(getByText('someChildren')).toBeInTheDocument();
  });

  it('calls drop action when drag happens', () => {
    const fakeDropAction = jest.fn();
    const firstCardIndex = 1;
    const secondCardIndex = 2;
    const fakeMonitor = { getClientOffset: () => ({}) };
    render(<DraggableCard index={firstCardIndex} onDrop={fakeDropAction} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    hover({ index: secondCardIndex }, fakeMonitor);

    expect(fakeDropAction).toHaveBeenCalledWith(secondCardIndex, firstCardIndex);
  })

  it('changes item index when drag happens', () => {
    const fakeDropAction = jest.fn();
    const firstCardIndex = 1;
    const secondCardIndex = 2;
    const fakeMonitor = { getClientOffset: () => ({}) };
    render(<DraggableCard index={firstCardIndex} onDrop={fakeDropAction} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    const targetItem = { index: secondCardIndex }
    hover(targetItem, fakeMonitor);

    expect(targetItem.index).toEqual(firstCardIndex);
  });

  it('does not trigger drop action if target and source index are the same', () => {
    const fakeDropAction = jest.fn();
    const firstCardIndex = 1;
    const secondCardIndex = 1;
    const fakeMonitor = { getClientOffset: () => ({}) };
    render(<DraggableCard index={firstCardIndex} onDrop={fakeDropAction} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    const targetItem = { index: secondCardIndex }
    hover(targetItem, fakeMonitor);

    expect(fakeDropAction).not.toHaveBeenCalled();
  });

  it('does not trigger drop action if drag not activated downwards', () => {
    const fakeDropAction = jest.fn();
    const firstCardIndex = 1;
    const secondCardIndex = 2;
    const fakeMonitor = { getClientOffset: () => ({ y: 1000 }) };
    render(<DraggableCard index={firstCardIndex} onDrop={fakeDropAction} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    const targetItem = { index: secondCardIndex }
    hover(targetItem, fakeMonitor);

    expect(fakeDropAction).not.toHaveBeenCalled();
  });

  it('does not trigger drop action if drag not activated upwards', () => {
    const fakeDropAction = jest.fn();
    const firstCardIndex = 2;
    const secondCardIndex = 1;
    const fakeMonitor = { getClientOffset: () => ({ y: -1000 }) };
    render(<DraggableCard index={firstCardIndex} onDrop={fakeDropAction} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    const targetItem = { index: secondCardIndex }
    hover(targetItem, fakeMonitor);

    expect(fakeDropAction).not.toHaveBeenCalled();
  });

  it('changes oppacity when item is being dragged', () => {
    dnd.useDragAndDrop.mockReturnValue({ isDragging: true });

    const { container } = render(<DraggableCard index={1} />);
    const noteCard = container.firstChild;

    expect(noteCard.style.opacity).toEqual("0");
  });
});
