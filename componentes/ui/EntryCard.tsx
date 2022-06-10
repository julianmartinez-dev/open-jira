import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { FC, DragEvent, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces'

interface Props {
  entry: Entry;
}

export const EntryCard : FC<Props> =  ({entry}) => {

  const { _id, createdAt, description, status } = entry;

  const { startDraggin, endDragging} = useContext(UIContext)

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text',_id)
    startDraggin()
  };
  return (
    <Card sx={{ marginBottom: 1}}
      draggable
      onDragStart={onDragStart}
      onDragEnd={endDragging}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{whiteSpace: 'pre-line'}}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
          <Typography variant='body2'>
            hace 30 minutos
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
