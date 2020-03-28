import React from 'react';

export default function NotesGrid(props) {
  const {notes} = props;

  return (
    <div>
      {notes.map(note => <NoteCard key={note.id} note={note} />)}
    </div>
  );
}

const NoteCard = (props) => {
  const { note } = props;

  return <div>
    <div aria-label="title">{note.title}</div>
    <div aria-label="content">{note.content}</div>
  </div>
};

