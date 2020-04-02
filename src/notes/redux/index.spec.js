import uuid from 'uuid';

import reducers, {
  createNote,
  swapNotes,
  deleteNote,
  updateNote,
  createEmptyState,
  pinNote,
  unpinNote
} from './index';


jest.mock('uuid', () => ({ v4: jest.fn() }));

describe('Note reducers', () => {

  const createTestState = (notes = []) => {
    const state = createEmptyState();
    return state.concat(notes);
  };

  describe('#createNote', function() {
    it('inserts note with id', () => {
      const state = createTestState();
      const note = {
        id: 'note_id',
        title: 'some note',
        content: 'bla bla bla'
      };

      uuid.v4.mockReturnValue('note_id');

      const action = createNote({ title: note.title, content: note.content });

      expect(reducers(state, action)).toEqual([{ ...note, sortOrder: expect.any(Number) }]);
    });

    it('inserts new item with default sort order', () => {
      const state = createTestState([{
        id: 'old note',
        title: 'some note',
        content: 'bla bla bla',
        sortOrder: 20
      }]);

      uuid.v4.mockReturnValue('new note');

      const action = createNote({ title: 'some new note' });

      const [note1, note2] = reducers(state, action);

      expect(note1.sortOrder < note2.sortOrder).toBe(true);
    });
  });


  describe('#updateNote', () => {
    it('updates note', () => {
      const note1 = {
        id: 'note1',
        title: 'some note',
        content: 'bla bla bla'
      };
      const note2 = {
        id: 'note2',
        title: 'some note2',
        content: 'bla bla bla2'
      };
      const note2update = {
        id: 'note2',
        title: 'note2Update',
        content: 'bla bla bla2'
      };
      const state = createTestState([ note1, note2 ]);

      const action = updateNote(note2update);

      expect(reducers(state, action)).toEqual(createTestState([ note1, note2update ]));
    });

    it('does nothing if note not found', () => {
      const note1 = {
        id: 'note1',
        title: 'some note',
        content: 'bla bla bla'
      };
      const note2 = {
        id: 'note2',
        title: 'some note2',
        content: 'bla bla bla2'
      };

      const noteWithWrongId = {
        id: 'somenotenotfound',
        title: 'note2Update',
        content: 'bla bla bla2'
      };

      const state = createTestState([ note1, note2 ]);

      const action = updateNote(noteWithWrongId);

      expect(reducers(state, action)).toEqual(createTestState([ note1, note2 ]));
    });
  });

  describe('#swapNotes', () => {
    it('swaps notes positions', () => {
      const note1 = {
        id: 'note1',
        title: 'some note',
        content: 'bla bla bla',
        sortOrder: 1000,
      };
      const note2 = {
        id: 'note2',
        title: 'some note2',
        content: 'bla bla bla2',
        sortOrder: 1001,
      };
      const note3 = {
        id: 'note3',
        title: 'some note3',
        content: 'bla bla bla3',
        sortOrder: 1002,
      };
      const state = createTestState([ note1, note2, note3 ]);

      const action = swapNotes({ src: note1.id, dest: note2.id });

      expect(reducers(state, action)).toEqual(createTestState([
        { ...note1, sortOrder: note2.sortOrder  },
        { ...note2, sortOrder: note1.sortOrder  },
        note3,
      ]));
    });

  });

  describe('#deleteNote', () => {
    it('deletes notes', () => {
      const note1 = {
        id: 'note1',
        title: 'some note',
        content: 'bla bla bla'
      };
      const note2 = {
        id: 'note2',
        title: 'some note2',
        content: 'bla bla bla2'
      };

      const state = createTestState([ note1, note2 ]);

      const action = deleteNote(note2.id);

      expect(reducers(state, action)).toEqual(createTestState([ note1 ]));
    });
  });

  describe('#pinNote', () => {
    it('marks note as pinned', () => {
      const note1 = {
        id: 'note1',
        title: 'some note',
        content: 'bla bla bla'
      };
      const note2 = {
        id: 'note2',
        title: 'some note2',
        content: 'bla bla bla2'
      };

      const state = createTestState([ note1, note2 ]);

      const action = pinNote(note2.id);

      expect(reducers(state, action)).toEqual(createTestState([ note1, { ...note2, isPinned: true } ]));
    });
  });

  describe('#unpinNote', () => {
    it('marks note as pinned', () => {
      const note1 = {
        id: 'note1',
        title: 'some note',
        content: 'bla bla bla',
      };
      const note2 = {
        id: 'note2',
        title: 'some note2',
        content: 'bla bla bla2',
        isPinned: true
      };

      const state = createTestState([ note1, note2 ]);

      const action = unpinNote(note2.id);

      expect(reducers(state, action)).toEqual(createTestState([ note1, { ...note2, isPinned: false } ]));
    });
  });
  it('ignores unknown action', () => {
    const state = createTestState();
    const action = { type: 'some-unknown-action' };
    expect(reducers(state, action)).toEqual(state);
  });

});
