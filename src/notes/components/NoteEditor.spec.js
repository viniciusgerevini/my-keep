import React from 'react';
import { render, act } from '@testing-library/react';
import draftJS, {EditorState, ContentState} from 'draft-js';
import NoteEditor from './NoteEditor';

describe('NoteEditor', () => {
  it('renders fields', () => {
    const { getByLabelText } = render(<NoteEditor />);

    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/content/i)).toBeInTheDocument();
    expect(getByLabelText(/actions/i)).toBeInTheDocument();
  });

  it('does not show title when hideTitle property provided', () => {
    const { getByLabelText, queryByLabelText } = render(<NoteEditor hideTitle={true} />);

    expect(getByLabelText(/content/i)).toBeInTheDocument();
    expect(getByLabelText(/actions/i)).toBeInTheDocument();
    expect(queryByLabelText(/title/i)).toBeNull();
  });

  it('does not show footer when hideFooter property provided', () => {
    const { getByLabelText, queryByLabelText } = render(<NoteEditor hideFooter={true} />);

    expect(getByLabelText(/content/i)).toBeInTheDocument();
    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(queryByLabelText(/actions/i)).toBeNull();
  });

  it('calls close callback when close button is pressed', () => {
    const onClose = jest.fn();

    const { getByLabelText } = render(<NoteEditor closeAction={onClose} />);

    getByLabelText(/close/i).click();

    expect(onClose).toHaveBeenCalled();
  });

  it('calls click callback when element is clicked', () => {
    const onClick = jest.fn();

    const { getByLabelText } = render(<NoteEditor onClick={onClick} />);

    getByLabelText(/title/i).click();

    expect(onClick).toHaveBeenCalled();
  });

  it('reverts changes when undo button is clicked', () => {
    jest.spyOn(EditorState, 'undo');
    const originalCreateEmpty = EditorState.createEmpty;
    let editorState;
    EditorState.createEmpty = jest.fn(() => {
      editorState = originalCreateEmpty();
      return editorState;
    });

    const { getByLabelText } = render(<NoteEditor/>);

    act(() => {
      getByLabelText(/undo/i).click();
    })

    expect(EditorState.undo).toHaveBeenCalledWith(editorState);

    EditorState.createEmpty = originalCreateEmpty;
  });

  it('re-applies changes when redo button is clicked', () => {
    jest.spyOn(EditorState, 'redo');
    const originalCreateEmpty = EditorState.createEmpty;
    let editorState;
    EditorState.createEmpty = jest.fn(() => {
      editorState = originalCreateEmpty();
      return editorState;
    });

    const { getByLabelText } = render(<NoteEditor/>);

    act(() => {
      getByLabelText(/redo/i).click();
    })

    expect(EditorState.redo).toHaveBeenCalledWith(editorState);

    EditorState.createEmpty = originalCreateEmpty;
  });

  describe('#getNoteContent', () => {
    it('returns update', () => {
      const originalConvertToRaw = draftJS.convertToRaw;
      const originalCreateEmpty = EditorState.createEmpty;
      let editorState;
      draftJS.convertToRaw = jest.fn().mockReturnValue('fake content state');
      EditorState.createEmpty = jest.fn(() => {
        editorState = EditorState.createWithContent(ContentState.createFromText('hello'));
        return editorState;
      });

      const noteEditorRef = React.createRef();
      const { getByLabelText } = render(<NoteEditor ref={noteEditorRef}/>);

      getByLabelText(/title/i).value = 'hey';

      expect(noteEditorRef.current.getNoteContent()).toEqual({
        title: 'hey',
        content: 'fake content state'
      });
      expect(draftJS.convertToRaw).toHaveBeenCalledWith(editorState.getCurrentContent());

      draftJS.convertToRaw = originalConvertToRaw;
      EditorState.createEmpty = originalCreateEmpty;
    });

    it('returns empty fields as undefined', () => {
      const noteEditorRef = React.createRef();
      render(<NoteEditor ref={noteEditorRef}/>);

      expect(noteEditorRef.current.getNoteContent()).toEqual({
        title: undefined,
        content: undefined
      });
    });
  });

  describe('#clearContent', () => {
    it('clear fields', () => {
      const noteEditorRef = React.createRef();
      const { getByLabelText } = render(<NoteEditor ref={noteEditorRef}/>);

      getByLabelText(/title/i).value = 'hey';

      act(() => {
        noteEditorRef.current.clearContent();
      });


      expect(noteEditorRef.current.getNoteContent()).toEqual({
        title: undefined,
        content: undefined
      });
    });
  });
});
