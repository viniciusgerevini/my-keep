import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { MenuBallsIcon } from '../../styled';
import HoverMenu from '../../layout/components/HoverMenu';
import { useClickOutside } from '../../layout/helpers/useClickOutside';
import { useDragAndDrop } from '../helpers/useDragAndDrop';

export default function NoteCard(props) {
  const { note, index, swapNotes, deleteNote, ...p } = props;
  const [isMenuVisible, setMenuVisible] = useState(false);
  const ref = useRef(null);
  const hoverMenuRef = useRef(null);

  const menuActions = [
    {
      text: 'Delete note',
      action() {
        setMenuVisible(false);
        deleteNote(note.id);
      }
    }
  ];

  useClickOutside(hoverMenuRef, () => {
    setMenuVisible(false);
  });

  const { isDragging } = useDragAndDrop(ref, {
    index,
    hover: createDragHoverCallback(ref, index, swapNotes)
  });

  const opacity = isDragging ? 0 : 1;

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuVisible(!isMenuVisible);
  };

  return (
    <NoteWrapper {...p} ref={ref} style={{ opacity }}>
      <NoteInnerWrapper>
        {note.title ?
          <div aria-label="title">{note.title}</div>
            : null }
              <NoteContent aria-label="content" className="note-content" dangerouslySetInnerHTML={{__html: note.content}}></NoteContent>
      </NoteInnerWrapper>
      <NoteActions>
        <MenuBallsIcon
          role="button"
          aria-label="More actions"
          title="More"
          onClick={toggleMenu}
        />
      </NoteActions>
      { isMenuVisible ? <HoverMenu ref={hoverMenuRef} items={menuActions}/> : undefined }
    </NoteWrapper>
  );
};

const createDragHoverCallback = (ref, currentElementIndex, swapNotes) => {
  return (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = currentElementIndex;

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

const NoteInnerWrapper = styled.div `
  min-height: 160px;
  padding-bottom: 46px;
`;

const NoteContent = styled.div `
  flex-grow: 1;
  max-height: 570px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoteActions = styled.div `
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 46px;
  display: flex;
  flex-direction: row-reverse;
  padding: 5px 0px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${NoteWrapper}:hover & {
    opacity: 1;
  }
`;
