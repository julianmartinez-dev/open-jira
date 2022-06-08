import { List, Paper } from '@mui/material'
import React, { FC, useContext, useMemo } from 'react'
import { EntriesContext } from '../../context/entries';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';

interface Props {
  status : EntryStatus;
}

export const EntryList: FC<Props> = ({status}) => {

  const { entries }  = useContext(EntriesContext);

  const entriesByStatus = useMemo(() => {
    return entries.filter(entry => entry.status === status)
  },[entries])


  return (
    <div>
      <Paper
        sx={{
          height: 'calc(100vh - 250px)',
          overflowY: 'scroll',
          backgroundColor: 'transparent',
          padding: '1px 5px',
        }}
      >
        <List sx={{ opacity: 1 }}>
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
