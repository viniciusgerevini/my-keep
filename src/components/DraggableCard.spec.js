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
  const fakeDropAction = jest.fn();
  let note1;
  let note2;

  beforeEach(() => {
    jest.clearAllMocks();
    note1 = { id: '123', sortOrder: 1 };
    note2 = { id: 'abc', sortOrder: 2 };
  });

  it('renders children', () => {
    const { getByText } = render(<DraggableCard item={note1} onDrop={fakeDropAction}><div>someChildren</div></DraggableCard>);

    expect(getByText('someChildren')).toBeInTheDocument();
  });

  it('calls drop action when drag happens', () => {
    const fakeMonitor = { getClientOffset: () => ({}) };
    render(<DraggableCard item={note1} onDrop={fakeDropAction} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    hover(note2, fakeMonitor);

    expect(fakeDropAction).toHaveBeenCalledWith(note2.id, note1.id);
  })

  it('changes item index when drag happens', () => {
    const fakeMonitor = { getClientOffset: () => ({}) };
    render(<DraggableCard item={note1} onDrop={fakeDropAction} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    const targetItem = { ...note2  }
    hover(targetItem, fakeMonitor);

    expect(targetItem.sortOrder).toEqual(note1.sortOrder);
  });

  it('does not trigger drop action if target and source sortOrder are the same', () => {
    const fakeMonitor = { getClientOffset: () => ({}) };
    render(<DraggableCard item={note1} onDrop={fakeDropAction} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    hover(note1, fakeMonitor);

    expect(fakeDropAction).not.toHaveBeenCalled();
  });

  it('does not trigger drop action if drag not activated downwards', () => {
    const fakeMonitor = { getClientOffset: () => ({ y: 1000 }) };
    render(<DraggableCard item={note2} onDrop={fakeDropAction} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    hover(note1, fakeMonitor);

    expect(fakeDropAction).not.toHaveBeenCalled();
  });

  it('does not trigger drop action if drag not activated upwards', () => {
    const fakeMonitor = { getClientOffset: () => ({ y: -1000 }) };
    render(<DraggableCard item={note1} onDrop={fakeDropAction} />);

    const { hover } = dnd.useDragAndDrop.mock.calls[0][1];
    hover(note2, fakeMonitor);

    expect(fakeDropAction).not.toHaveBeenCalled();
  });

  it('changes oppacity when item is being dragged', () => {
    dnd.useDragAndDrop.mockReturnValue({ isDragging: true });

    const { container } = render(<DraggableCard item={note1} onDrop={fakeDropAction} />);
    const noteCard = container.firstChild;

    expect(noteCard.style.opacity).toEqual("0");
  });
});
