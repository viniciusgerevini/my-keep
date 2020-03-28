import reducers, { createNote } from './index';

describe('Note reducers', () => {
  it('inserts note', () => {
    const state = [];
    const note = { title: 'some note', content: 'bla bla bla'};
    const action = createNote(note)

    expect(reducers(state, action)).toEqual([note]);
  });

  it('ignores unknown action', () => {
    const state = [];
    const action = { type: 'some-unknown-action' };
    expect(reducers(state, action)).toEqual(state);
  });
  
});
