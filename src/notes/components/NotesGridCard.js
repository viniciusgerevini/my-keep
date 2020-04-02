import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  MenuBallsIcon,
  PinIcon,
  UnpinIcon
} from '../../styled';
import HoverMenu from '../../layout/components/HoverMenu';
import { useClickOutside } from '../../layout/helpers/useClickOutside';
import DraggableCard from './DraggableCard';

export default function NoteCard(props) {
  const {
    note,
    index,
    togglePinNote,
    swapNotes,
    duplicateNote,
    deleteNote,
    ...p
  } = props;
  const [isMenuVisible, setMenuVisible] = useState(false);
  const hoverMenuRef = useRef(null);

  const menuActions = [
    {
      text: 'Delete note',
      action() {
        setMenuVisible(false);
        deleteNote(note.id);
      }
    },
    {
      text: 'Duplicate note',
      action() {
        setMenuVisible(false);
        duplicateNote(note);
      }
    }
  ];

  useClickOutside(hoverMenuRef, () => {
    setMenuVisible(false);
  });

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuVisible(!isMenuVisible);
  };

  const togglePin = (e) => {
    e.stopPropagation();
    togglePinNote(note.id);
  };

  return (
    <DraggableCard {...p} index={index} onDrop={swapNotes} className="note-parent">
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
      { togglePinNote ?
          <Pin role="button" onClick={togglePin}>
            { note.isPinned ?
                <UnpinIcon aria-label="Unpin note" title="Unpin note"/>
              : <PinIcon aria-label="Pin note" title="Pin note"/>
            }
          </Pin>
        : undefined }
    </DraggableCard>
  );
};

NoteCard.propTypes = {
  note: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  swapNotes: PropTypes.func.isRequired,
  deleteNote: PropTypes.func,
  togglePinNote: PropTypes.func,
};


const NoteInnerWrapper = styled.div `
  min-height: 160px;
  padding-bottom: 46px;
`;

const NoteContent = styled.div `
  flex-grow: 1;
  max-height: 480px;
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

  .note-parent:hover & {
    opacity: 1;
  }
`;

const Pin = styled.div `
  position: absolute;
  top: 1px;
  right: 0px;
  font-size: 1.3em;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  .note-parent:hover & {
    opacity: 1;
  }
`;
