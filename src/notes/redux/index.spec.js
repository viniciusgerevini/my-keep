import reducers, { createNote } from './index';
import uuid from 'uuid';

jest.mock('uuid', () => ({ v4: jest.fn() }));

describe('Note reducers', () => {
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

  it('ignores unknown action', () => {
    const state = [];
    const action = { type: 'some-unknown-action' };
    expect(reducers(state, action)).toEqual(state);
  });
  
});
