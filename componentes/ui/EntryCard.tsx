import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { FC } from 'react';
import { Entry } from '../../interfaces'

interface Props {
  entry: Entry;
}

export const EntryCard : FC<Props> =  ({entry}) => {

  const { _id, createdAt, description, status } = entry;
  return (
    <Card sx={{ marginBottom: 1}}>
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
