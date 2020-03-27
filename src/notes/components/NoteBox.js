import React, { useEffect, useRef, useState } from 'react';
import NoteEditor from './NoteEditor';

export default function AddNoteBox(props) {
  const {updateNote} = props;
  const [isFocused, setFocused] = useState(false);

  const editorRef = useRef(null);

  const close = (e) => {
    if (e) {
      e.stopPropagation();
    }
    updateNote(editorRef.current.getNoteContent());
    editorRef.current.clearContent();
    setFocused(false);
  };

  const handleClickOutsideWrapper = (event) => {
    if (editorRef.current && !editorRef.current.element.contains(event.target) && isFocused) {
      close();
    }
  };

  const handleClick = () => {
    setFocused(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideWrapper);
    return () => { document.removeEventListener("mousedown", handleClickOutsideWrapper) };
  });

  return (
    <NoteEditor
      ref={editorRef}
      onClick={handleClick}
      closeAction={close}
      hideTitle={!isFocused}
      hideFooter={!isFocused}
    />
  );
}

