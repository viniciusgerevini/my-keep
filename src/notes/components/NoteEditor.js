import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import {Editor, EditorState, convertToRaw} from 'draft-js';
import { UndoIcon, RedoIcon, ActionButton } from '../../styled';

import 'draft-js/dist/Draft.css';

const AddNoteWrapper = styled.div `
  width: 600px;
  background-color: ${props => props.theme.background};
  box-shadow: ${props => props.theme.shadow};
  margin: 0 auto;
  padding: 15px;
  border-radius: 5px;
`;

const TitleInput = styled.input `
  width: 100%;
  border: none;
  background-color: ${props => props.theme.background};
  font-size: 1.1em;
  color: ${props => props.theme.color};
  padding-bottom: 20px;

  &:focus {
    ::placeholder {
      color: ${props => props.theme.secondaryTextColor};
    }
  }
  ::placeholder {
    color: ${props => props.theme.textColor};
  }
`;

const Actions = styled.div `
  flex-grow: 1;
`;

const Footer = styled.div `
  display: flex;
  margin-top: 20px;
`;

function NoteEditor(props, ref) {
  const {hideTitle, hideFooter, closeAction, onClick} = props;
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(),
  );

  const editor = useRef(null);
  const wrapper = useRef(null);
  const title = useRef(null);

  useImperativeHandle(ref, () => ({
    getNoteContent() {
      const content = editorState.getCurrentContent();
      const titleContent = title.current.value;
      const update = {
        title: titleContent  === "" ? undefined : titleContent,
        content: content.hasText() ? convertToRaw(content) : undefined
      };

      return update;
    },

    clearContent() {
      setEditorState(EditorState.createEmpty());
      title.current.value = '';
    },
    element: wrapper.current
  }));

  const undo = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const redo = () => {
    setEditorState(EditorState.redo(editorState));
  };

  return (
    <AddNoteWrapper ref={wrapper} onClick={onClick}>
      {hideTitle ? '' : <TitleInput placeholder="Title" ref={title} aria-label="title"/>}

      <Editor
        ref={editor}
        ariaLabel="content"
        placeholder="Take a note..."
        editorState={editorState}
        onChange={setEditorState}
      />

      {hideFooter ? '' :
        <Footer>
          <Actions aria-label="Actions">
            <UndoIcon onClick={undo} aria-label="Undo"/>
            <RedoIcon onClick={redo} aria-label="Redo"/>
          </Actions>
          <ActionButton onClick={closeAction} aria-label="close">Close</ActionButton>
        </Footer>
      }
    </AddNoteWrapper>);
}

export default forwardRef(NoteEditor);

