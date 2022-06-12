import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: 'ENTRY_ADD_ENTRY'; payload: Entry }
  | { type: 'ENTRY_UPDATED'; payload: Entry }
  | { type: 'ENTRY_REFRESH_DATA'; payload: Entry[] }
  | { type: 'ENTRY_DELETE'; payload: string };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case 'ENTRY_ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case 'ENTRY_UPDATED':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            return action.payload;
          }
          return entry;
        })
      }
    case 'ENTRY_REFRESH_DATA':
      return {
        ...state,
        entries:[...action.payload]
      }
    case 'ENTRY_DELETE':
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload)
      }

    default:
      return state;
  }
};
