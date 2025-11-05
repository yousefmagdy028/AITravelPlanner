import { NextResponse } from "next/server";

export async function POST(req) {
    const {message} = await  req.json()
     if (!message) {
      return NextResponse.json(
        { message: 'Message is required' },
        { status: 400 }
      );
    }

    if(!process.env.OPENROUTER_API_KEY){
    console.error('OPENROUTER_API_KEY is not configured');

    return NextResponse.json(
        { message: 'API key is not configured' },
        { status: 500 }
      );
    }

    console.log('Attempting API request with message:', message);
    console.log('API Key validation:', !!process.env.OPENROUTER_API_KEY);


    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{
            method:"POST",

             headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}` ,
            "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            "X-Title": "AI Trip Planner", // Optional. Site title for rankings on openrouter.ai.
            "Content-Type": "application/json"
            },

             body: JSON.stringify({
            "model": "openai/gpt-oss-20b",
            "messages": [
            {
                "role": "system",
                "content": `You are an ai travel planner. 
                when user say hello to you, respond with a friendly greeting and ask how you can assist with their travel plans.
                ⚠️ Always return ONLY valid JSON. 
                Do not add any text before or after. 
                Do not include explanations. 
                Respond strictly in JSON matching this schema:
                {
                
                "destination": string,
                "best_time": string,
                "budget": { "low": string, "mid": string, "high": string },
                "itinerary": [ { "day": number, "activities": string[] } ],
                "accommodation": [ { "type": string, "name": string, "price": string } ],
                "food": [ { "name": string, "price": string } ],
                "transportation": string,
                "tips": string[]
                                
                }           
                `
            }, {
                role:"user",
                content:message
            }
            ],

           temperature: 0.7, // Slightly reduced for more focused responses
            max_tokens: 1500
        })

        })

        const data = await response.json()
        console.log('Successfully received API response');

        if(!data.choices?.[0]?.message?.content){
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response format from API');
        }
        return NextResponse.json({response:data.choices?.[0]?.message?.content})




     

    } catch (error) {
       console.error('Fetch operation failed:', error); 

       return NextResponse.json(
        { message: `API request failed: ${error.message}` },
        { status: 500 }
      );
    }  
}


export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  );
}