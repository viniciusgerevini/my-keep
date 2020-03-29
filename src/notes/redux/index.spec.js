import reducers, { createNote, swapNotes } from './index';
import uuid from 'uuid';

jest.mock('uuid', () => ({ v4: jest.fn() }));

describe('Note reducers', () => {
  describe('#createNote', function() {
    it('inserts note with id', () => {
      const state = [];
      const note = {
        id: 'note_id',
        title: 'some note',
        content: 'bla bla bla'
      };

      uuid.v4.mockReturnValue('note_id');

      const action = createNote({ title: note.title, content: note.content });

      expect(reducers(state, action)).toEqual([note]);
    });


    it('inserts new note as first item', () => {
      const state = [{
        id: 'old note',
        title: 'some note',
        content: 'bla bla bla'
      }];

      uuid.v4.mockReturnValue('new note');

      const action = createNote({ title: 'some new note' });

      expect(reducers(state, action)[0].id).toEqual("new note");
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
      const state = [ note1, note2, note3 ];

      const action = swapNotes({ src: 0, dest: 2 });
  
      expect(reducers(state, action)).toEqual([ note3, note2, note1 ]);
    });

  });

  it('ignores unknown action', () => {
    const state = [];
    const action = { type: 'some-unknown-action' };
    expect(reducers(state, action)).toEqual(state);
  });
  
});