import { useContext, useState } from 'react';
import { Button, TextField, Box } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

  const { addNewEntry } = useContext(EntriesContext);
  const { addingEntry, setAddingEntry } = useContext(UIContext)

  const [ inputValue, setInputValue] = useState('');
  const [ touched, setTouched ] = useState(false);

  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onSave = () => {
    if(inputValue.length <= 0 ) return;
    addNewEntry(inputValue);
    cleanState();
  }

  const onCancel = () =>{
    cleanState()
  }

  const cleanState = () => {
    setTouched(false);
    setAddingEntry(false);
    setInputValue('');
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {addingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            label="Nueva entrada"
            helperText={
              inputValue.length <= 0 && touched
                ? 'La entrada no puede estar vacía'
                : ''
            }
            value={inputValue}
            onChange={onTextFieldChanged}
            error={inputValue.length <= 0 && touched}
            onBlur={() => setTouched(true)}
          />

          <Box display={'flex'} justifyContent={'space-around'}>
            <Button
              onClick={onCancel}
              variant="outlined"
              color="error"
              endIcon={<CancelIcon />}
            >
              Cancelar
            </Button>

            <Button
              onClick={onSave}
              variant="outlined"
              color="secondary"
              endIcon={<SaveIcon />}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddIcon />}
          fullWidth
          variant="outlined"
          color="info"
          onClick={() => setAddingEntry(true)}
        >
          Agregar entrada
        </Button>
      )}
    </Box>
  );
}
