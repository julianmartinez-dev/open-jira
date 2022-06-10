import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'

type Data = {
    message: string
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

    if( process.env.NODE_ENV === 'production') {
        return res.status(401).json({
            message: 'El endpoit no esta disponible en producción'
        })
    }

    await db.connect();
    await Entry.deleteMany();
    await Entry.insertMany(seedData.entries);
    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}