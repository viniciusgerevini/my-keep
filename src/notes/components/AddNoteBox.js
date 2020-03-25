import React from 'react';
import styled from 'styled-components';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

export const AddNoteWrapper = styled.div `
  width: 600px;
  background-color: ${props => props.theme.background};
  box-shadow: ${props => props.theme.shadow};
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 5px;
`;

// TODO on focus show title, show cancel button, show toolbar with undo and redo button
// TODO on focus lost, if empty hide everything otherwise save changes and hide everything

export default function AddNoteBox() {
    const [editorState, setEditorState] = React.useState(
      EditorState.createEmpty(),
    );

  return (<AddNoteWrapper>
    <Editor
      placeholder="Take a note..."
      editorState={editorState}
      onChange={setEditorState} />
  </AddNoteWrapper>);
}
