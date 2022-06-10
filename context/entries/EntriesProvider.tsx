import { FC, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces'
import { entriesApi } from '../../apis';


export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
    children: React.ReactNode
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: 'ENTRY_REFRESH_DATA', payload: data });
  }

  useEffect(() => {
    refreshEntries();
  },[])
  
  const addNewEntry = async ( description: string) => {
    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   description,
    //   createdAt: Date.now(),
    //   status: 'pending',
    // }

    try {
      const { data : newEntry } = await entriesApi.post<Entry>('/entries', { description })
      dispatch({ type: 'ENTRY_ADD_ENTRY', payload: newEntry });
    } catch (error) {
      console.log(error)
    }
    

   
  }

  const updateEntry = (entry: Entry) => {
    dispatch({ type: 'ENTRY_UPDATED', payload: entry });
  }
  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};