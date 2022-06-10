import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
{message: string}
| IEntry[]
| IEntry

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getEntries( res )
            break;
        case 'POST':
            return addEntry( req, res )
        default:
            return res.status(400).json({ message: 'Method not allowed' })
    }
}

const getEntries = async ( res: NextApiResponse ) =>{
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'asc' });
    await db.disconnect();

    res.status(200).json( entries )

}

const addEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) =>{
    
    const { description = "" } = req.body;
    const newEntry = new Entry({ 
        description,
        createdAt: Date.now(),
    });

    try {
        await db.connect()
        await newEntry.save()
        await db.disconnect()

        return res.status(200).json( newEntry )
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Error saving entry' })
    }
}