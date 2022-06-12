import { FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'
import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
} from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Layout } from '../../componentes/layouts';
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import Router from 'next/router';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ( { entry } ) => {

    const { updateEntry, deleteEntry } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const statusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {
      // console.log({ inputValue, status });
      if(inputValue.trim().length === 0) return;

      const updatedEntry: Entry = {
        ...entry,
        status,
        description: inputValue,
      }

      updateEntry(updatedEntry, true);
    
    };

    const handleDelete = () => {
      deleteEntry(entry._id);
      setTimeout(() => {
        Router.push('/'); 
      }, 2000);
    }


  return (
    <Layout title={inputValue.substring(0,20)+"..."}>
      <Grid container justifyContent={'center'} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={inputChange}
                helperText={ isNotValid &&'Debe ingresar una entrada' }
                error={isNotValid}
              />

              <FormControl sx={{ marginTop: 2 }}>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={statusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveAsOutlinedIcon />}
                variant="contained"
                fullWidth
                disabled={inputValue.length <= 0}
                onClick={onSave}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'red',
        }}
        onClick={handleDelete}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
};


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    return {
        props: {
          entry
        }
    }
}




export default EntryPage;
