import React, { useRef } from 'react';
import styled from 'styled-components';

import { useDragAndDrop } from '../helpers/useDragAndDrop';

const NoteWrapper = styled.div `
  width: auto;
  min-width: 240px;
  max-height: 570px;
  min-height: 180px;
  background-color: ${props => props.theme.background};
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.borderColor};
  line-height: 1.2em;
  overflow: hidden;
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

export default function NoteCard(props) {
  const { note, index, swapNotes, ...p } = props;
  const ref = useRef(null);

  const { isDragging } = useDragAndDrop(ref, {
    index,
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

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
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // TODO implement same check for left and right drag

      // Time to actually perform the action
      swapNotes(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  });

  const opacity = isDragging ? 0 : 1;

  return <NoteWrapper {...p} ref={ref} style={{ opacity }}>
    <div>
      {note.title ? 
        <div aria-label="title">{note.title}</div>
      : null }
      <div aria-label="content" dangerouslySetInnerHTML={{__html: note.content}}></div>
    </div>
  </NoteWrapper>
};

