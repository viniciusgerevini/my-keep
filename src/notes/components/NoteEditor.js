import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
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

const EditorPlaceholder = styled.div `
  color: ${props => props.theme.secondaryTextColor};
  cursor: text;
`;

const EditorContainer = styled.div `
  max-height: 70vh;
  overflow: auto;
  padding: 5px 0px;
`

function NoteEditor(props, ref) {
  const {
    hideTitle,
    hideEditor,
    hideFooter,
    closeAction,
    onClick,
    note,
    ...extraProps
  } = props;

  const editor = useRef(null);
  const wrapper = useRef(null);
  const title = useRef(null);

  const [editorState, setEditorState] = useState(
    note && note.content ? EditorState.createWithContent(stateFromHTML(note.content)) : EditorState.createEmpty(),
  );

  useEffect(() => {
    if (editor.current && !hideEditor) {
      editor.current.focus();
    }
  }, [hideEditor]);

  useImperativeHandle(ref, () => ({
    getNoteContent() {
      const content = editorState.getCurrentContent();
      const titleContent = title.current.value;
      const update = {
        ...(note ? { id: note.id } : {} ),
        title: titleContent  === "" ? undefined : titleContent,
        content: content.hasText() ? stateToHTML(content) : undefined
      };

      return update;
    },

    clearContent() {
      setEditorState(EditorState.createEmpty());
      title.current.value = '';
    },
    element: wrapper.current,
  }));

  const undo = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const redo = () => {
    setEditorState(EditorState.redo(editorState));
  };

  return (
    <AddNoteWrapper ref={wrapper} aria-label="Note editor" onClick={onClick} {...extraProps}>
      {hideTitle ? '' : <TitleInput placeholder="Title" ref={title} defaultValue={note ? note.title : undefined} aria-label="title"/>}

      { hideEditor ? <EditorPlaceholder>{'Take a note...'}</EditorPlaceholder>:
        <EditorContainer>
          <Editor
            ref={editor}
            ariaLabel="content"
            placeholder="Take a note..."
            editorState={editorState}
            onChange={setEditorState}
          />
        </EditorContainer>
      }

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

NoteEditor.propTypes = {
  hideTitle: PropTypes.bool,
  hideEditor: PropTypes.bool,
  hideFooter: PropTypes.bool,
  closeAction: PropTypes.func,
  onClick: PropTypes.func,
  note: PropTypes.object.isRequired,
};

