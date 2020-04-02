import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NoteEditor from './NoteEditor';

export default function EditNoteModal(props) {
  const { note, onModalClose, updateNote } = props;
  const editorRef = useRef(null);
  const backgroundRef = useRef(null);

  const onCloseTriggered = () => {
    if (updateNote) {
      updateNote(editorRef.current.getNoteContent());
    }
    onModalClose();
  };

  return (
    <ModalWrapper>
      <NoteEditor className='modal-editor' ref={editorRef} note={note} closeAction={onCloseTriggered}/>
      <ModalBackground ref={backgroundRef} onClick={onCloseTriggered}/>
    </ModalWrapper>
  );
};

EditNoteModal.propTypes = {
  note: PropTypes.object,
  onModalClose: PropTypes.func.isRequired,
  updateNote: PropTypes.func
}

const ModalBackground = styled.div `
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 300px;
  background-color: ${props => props.theme.background};
  opacity: 0.7;
`;

const ModalWrapper = styled.div `
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-editor {
    position: relative;
    z-index: 301;
  }
`;
