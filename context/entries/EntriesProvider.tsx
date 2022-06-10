import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces'


export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        'PENDING: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis facere consequatur ipsum molestiae cumque ut impedit eos doloremque eligendi, quaerat officiis neque ex ratione autem rem sunt temporibus vitae suscipit.',
      createdAt: Date.now(),
      status: 'pending',
    },
    {
      _id: uuidv4(),
      description:
        "IN-PROGRESS: Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dignissimos tempora, corrupti accusantium voluptate unde repellat molestiae quia? Placeat at voluptatibus deserunt corporis magnam dicta expedita facilis cupiditate rem animi.",
      createdAt: Date.now()-1561455,
      status: 'in-progress',
    },
    {
      _id: uuidv4(),
      description:
        'PENDING: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis facere consequatur ipsum molestiae cumque ut impedit eos doloremque eligendi, quaerat officiis neque ex ratione autem rem sunt temporibus vitae suscipit.',
      createdAt: Date.now()-984651651,
      status: 'pending',
    },
    {
      _id: uuidv4(),
      description:
        'FINISHED: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis facere consequatur ipsum molestiae cumque ut impedit eos doloremque eligendi, quaerat officiis neque ex ratione autem rem sunt temporibus vitae suscipit.',
      createdAt: Date.now()-100000,
      status: 'finished',
    },
  ],
};

interface Props {
    children: React.ReactNode
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  
  const addNewEntry = ( description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending',
    }

    dispatch({ type: 'ENTRY_ADD_ENTRY', payload: newEntry });
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