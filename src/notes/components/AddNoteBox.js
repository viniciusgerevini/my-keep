import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

export const AddNoteWrapper = styled.div `
  width: 600px;
  background-color: ${props => props.theme.background};
  box-shadow: ${props => props.theme.shadow};
  margin: 0 auto;
  padding: 20px 20px;
  border-radius: 5px;
`;

// TODO on focus show title, show cancel button, show toolbar with undo and redo button
// TODO on focus lost, if empty hide everything otherwise save changes and hide everything
export default function AddNoteBox() {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(),
  );

  const [isFocused, setFocused] = useState(false);

  const editor = useRef(null);
  const wrapper = useRef(null);

  const handleClickOutsideWrapper = (event) => {
    if (wrapper.current && !wrapper.current.contains(event.target) && isFocused) {
      setFocused(false)
    }
  };

  // TODO on blur
  // - build note update ( id , title, content, updateTime )
  // - call prop updateNote with info
  // - clear editor state
  // - setFocused(false)

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideWrapper);
    return () => { document.removeEventListener("mousedown", handleClickOutsideWrapper) };
  });


  // TODO title is an input
  return (<AddNoteWrapper ref={wrapper}
    onClick={() => isFocused ? undefined : editor.current.focus()}
    >
    {isFocused ? 'Title' : ''}
    <Editor
      ref={editor}
      placeholder="Take a note..."
      editorState={editorState}
      onChange={setEditorState}
      onFocus={() => setFocused(true)}
    />
    {isFocused ? 'Toolbox' : ''}
  </AddNoteWrapper>);
  // TODO toolbox undo, redo, close
}

