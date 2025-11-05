import { db } from "@/config/db";
import { checkout } from "@/config/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json()
            const { firstName, lastName, email,  phone, checkInDate, checkOutDate, travelers, price } = data;

           
        if (!firstName || !lastName   || !email  || !phone || !checkInDate || !checkOutDate || !travelers || !price ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    } 
    
    const result = await  db.insert(checkout).values({
      firstName,
      lastName,
      email,
     
      phone,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      travelers,
      price,
    }).returning(checkout)

    return NextResponse.json({success:true ,checkout: result[0]}, { status: 201 })

    } catch (error) {
     console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function  GET(req){

    try{
          const destination = await db.select().from(checkout)

    return NextResponse.json({success:true,data:destination})
    }catch(error){
          console.error("❌ Error Fetching destination:", error);
  return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    }
  
}