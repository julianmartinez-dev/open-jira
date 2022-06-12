import { FC, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: React.ReactNode;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const { enqueueSnackbar } = useSnackbar();

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: 'ENTRY_REFRESH_DATA', payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  const addNewEntry = async (description: string) => {
    try {
      const { data: newEntry } = await entriesApi.post<Entry>('/entries', {
        description,
      });
      dispatch({ type: 'ENTRY_ADD_ENTRY', payload: newEntry });
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntry = async ({ _id, description, status }: Entry, showSnackBar = false) => {
    try {
      const { data: entryUpdated } = await entriesApi.put<Entry>(
        `/entries/${_id}`,
        { description, status }
      );
      dispatch({ type: 'ENTRY_UPDATED', payload: entryUpdated });

      if(showSnackBar) {
        enqueueSnackbar('Entrada actualizada', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEntry = async (_id: string) => {
    try {
      await entriesApi.delete(`/entries/${_id}`);
      dispatch({ type: 'ENTRY_DELETE', payload: _id });
      enqueueSnackbar('Entrada eliminada', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
