import { EntriesState } from './';

type EntriesActionType = { type: '[Entry] - ActionName' };

export const entriesReducer = (state: EntriesState,action: EntriesActionType) : EntriesState => {
  switch (action.type) {
    case '[Entry] - ActionName':
      return {
        ...state,
      };

    default:
      return state;
  }
};
