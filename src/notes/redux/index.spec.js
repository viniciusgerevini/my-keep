import uuid from 'uuid';

import reducers, {
  createNote,
  swapNotes,
  deleteNote,
  updateNote,
  createEmptyState
} from './index';


jest.mock('uuid', () => ({ v4: jest.fn() }));

describe('Note reducers', () => {

  const createTestState = (notes = []) => {
    const state = createEmptyState();
    state.notes = notes;
    return state;
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

      expect(reducers(state, action)).toEqual(createTestState([note]));
    });

    it('inserts new note as first item', () => {
      const state = createTestState([{
        id: 'old note',
        title: 'some note',
        content: 'bla bla bla'
      }]);

      uuid.v4.mockReturnValue('new note');

      const action = createNote({ title: 'some new note' });

      expect(reducers(state, action).notes[0].id).toEqual("new note");
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
        content: 'bla bla bla'
      };
      const note2 = {
        id: 'note2',
        title: 'some note2',
        content: 'bla bla bla2'
      };
      const note3 = {
        id: 'note3',
        title: 'some note3',
        content: 'bla bla bla3'
      };
      const state = createTestState([ note1, note2, note3 ]);

      const action = swapNotes({ src: 0, dest: 2 });

      expect(reducers(state, action)).toEqual(createTestState([ note3, note2, note1 ]));
    });

  });

  describe('#deleteNote', () => {
    it('swaps notes positions', () => {
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

  it('ignores unknown action', () => {
    const state = createTestState();
    const action = { type: 'some-unknown-action' };
    expect(reducers(state, action)).toEqual(state);
  });

});
