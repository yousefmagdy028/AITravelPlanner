import { db } from "@/config/db";
import { destinations } from "@/config/schema";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const formData = await req.formData()


        let imageData = null;

        const imageFile = formData.get("imageUrl");

      if (imageFile && imageFile.size > 0) {
            // Convert to base64
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64 = buffer.toString('base64');
            imageData = `data:${imageFile.type};base64,${base64}`;
        } 

         

         const newDestination  = {
      name: formData.get("name"),
      country: formData.get("country"),
      city: formData.get("city"),
      description: formData.get("description"),
      highlights: formData.get("highlights"),
      bestSeason: formData.get("bestSeason"),
      activities: formData.get("activities"),
      price: parseFloat(formData.get("price")),
      duration: formData.get("duration"),
       imageUrl: imageData || null,
         }
     console.log(" Incoming destination:", newDestination);

     const result = await db.insert(destinations).values(newDestination).returning(destinations)

    console.log("✅ Insert result:", result);

    return NextResponse.json({success:true,data:result})
    } catch (error) {
  console.error("❌ Error adding destination:", error);
  return NextResponse.json({ success: false, error: error.message }, { status: 500 });

        
    }
}

export async function  GET(req){

    try{
          const destination = await db.select().from(destinations)

    return NextResponse.json({success:true,data:destination})
    }catch(error){
          console.error("❌ Error Fetching destination:", error);
  return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    }
  
}

