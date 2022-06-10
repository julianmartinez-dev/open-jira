import { List, Paper } from '@mui/material'
import React, { FC, useContext, useMemo, DragEvent } from 'react'
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';

interface Props {
  status : EntryStatus;
}

export const EntryList: FC<Props> = ({status}) => {

  const { entries, updateEntry }  = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(() => {
    return entries.filter(entry => entry.status === status)
  },[entries])

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text');
    const entry = entries.find(entry => entry._id === id)!;

    entry.status = status;

    updateEntry(entry);
    endDragging();

  };

  const allowDrop = (e: DragEvent<HTMLDivElement>) =>{
    e.preventDefault();
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={ allowDrop }
    >
      <Paper
        sx={{
          height: 'calc(100vh - 250px)',
          overflowY: 'scroll',
          backgroundColor: 'transparent',
          padding: '1px 5px',
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  );
}
