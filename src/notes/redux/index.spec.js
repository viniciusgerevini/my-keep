import reducers, { createNote } from './index';
import uuid from 'uuid/v4';

jest.mock('uuid/v4');

describe('Note reducers', () => {
  it('inserts note with id', () => {
    const state = [];
    const note = {
      id: 'note_id',
      title: 'some note',
      content: 'bla bla bla'
    };

    uuid.mockReturnValue('note_id');

    const action = createNote({ title: note.title, content: note.content });

    expect(reducers(state, action)).toEqual([note]);
  });

  it('ignores unknown action', () => {
    const state = [];
    const action = { type: 'some-unknown-action' };
    expect(reducers(state, action)).toEqual(state);
  });
  
});
