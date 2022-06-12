import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  // const { id } = req.query;

  // if (!mongoose.isValidObjectId(id)){

  //     return res.status(400).json({ message: 'ID Inválido: ' + id });
  // }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);
    case 'GET':
      return getEntryByID(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: 'Método inexistente' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);
  //Si no existe la entrada
  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(404).json({ message: 'No existe entrada con ese ID:' });
  }

  try {
    //Si existe la entrada, pero no hay datos dejamos los que ya tenia
    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body;

    //Enviamos la consulta a la base de datos
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedEntry!);

    await db.disconnect();
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntryByID = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;
  await db.connect();
  const entry = await Entry.findById(id);
  await db.disconnect();

  if (!entry) {
    return res.status(404).json({ message: 'No existe entrada con ese ID:' });
  }

  return res.status(200).json(entry);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  
  try {
    await db.connect();
    await Entry.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Entrada eliminada' });
  } catch (error) {
    console.log(error)
  }
  await db.disconnect();
}