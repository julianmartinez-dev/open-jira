import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import { FC, DragEvent, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces'
import { dateFunctions } from '../../utils/';


interface Props {
  entry: Entry;
}

export const EntryCard : FC<Props> =  ({entry}) => {

  const { _id, createdAt, description, status } = entry;
  const router = useRouter()

  const { startDraggin, endDragging} = useContext(UIContext)

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text',_id)
    startDraggin()
  };

  const handleRedirect = () => {
    router.push(`/entries/${_id}`)
  }
  return (
    <Card sx={{ marginBottom: 1}}
      draggable
      onDragStart={onDragStart}
      onDragEnd={endDragging}
      onClick={handleRedirect}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{whiteSpace: 'pre-line'}}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'end'}}>
          <Typography variant='body2'>
            { dateFunctions.getFormatDistanceToNow(createdAt) }
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
