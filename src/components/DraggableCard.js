import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useDragAndDrop } from '../helpers/useDragAndDrop';

export default function DraggableCard(props) {
  const { item, onDrop, children, ...p } = props;
  const ref = useRef(null);

  const { isDragging } = useDragAndDrop(ref, {
    ...item,
    hover: createDragHoverCallback(ref, item, onDrop)
  });

  const opacity = isDragging ? 0 : 1;

  return (
    <NoteWrapper {...p} ref={ref} style={{ opacity }}>
        {children}
    </NoteWrapper>
  );
};

DraggableCard.propTypes = {
  item: PropTypes.object.isRequired,
  onDrop: PropTypes.func.isRequired,
  children: PropTypes.node
};

const createDragHoverCallback = (ref, currentItem, onDrop) => {
  return (otherItem, monitor) => {
      const dragIndex = otherItem.sortOrder;
      const hoverIndex = currentItem.sortOrder;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // TODO implement same check for left and right drag

      // Time to actually perform the action
      onDrop(otherItem.id, currentItem.id);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      otherItem.sortOrder = currentItem.sortOrder;
    }
}

const NoteWrapper = styled.div `
  position: relative;
  width: auto;
  min-width: 240px;
  background-color: ${props => props.theme.background};
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.borderColor};
  line-height: 1.2em;
  word-wrap: break-word;
  padding: 10px;

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 1px 3px 1px rgba(60,64,67,0.149);
  }

  [aria-label = "title"] {
    font-size: 1.1em;
    font-weight: 500;
    margin-bottom: 15px;
  }
`;
