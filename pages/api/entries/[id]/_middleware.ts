import mongoose from 'mongoose';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest, ev: NextFetchEvent) {


  const id = req.page.params?.id || ''

  const checkMongoIDRegex = new RegExp("^[0-9a-fA-F]{24}$");

   if(!checkMongoIDRegex.test( id )){
        return new NextResponse(
          JSON.stringify({ message: 'ID Inválido: ' + id }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
   }


  return NextResponse.next();
}
