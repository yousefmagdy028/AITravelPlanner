"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

function page() {

  const [tripData,setTripData] = useState(null)
  const [inputMessage,setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);


  const examplePrompts = [
   "Plan a week in Tokyo for $3000",
    "Best European cities for first-time travelers",
    "Romantic weekend in Italy",
    "Backpacking through Southeast Asia",
    "Family vacation to Disney World"
  ]


    const fetchImage = async(type="accommodation", items)=> {
        return await Promise.all(
          items.map(async(item)=> {
            try {
              const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(item.name)}&per_page=1`,
              {headers:{Authorization:process.env.NEXT_PUBLIC_PEXELS_API_KEY}}
            )

            const data = await res.json()
            return {...item , image : data?.photos?.[0]?.src?.medium || null}
           
            } catch  {
               return { ...item, image: null };
            }
          })
        )
    }

    const handleSubmit = async(e)=> {
      e.preventDefault()
       if (!inputMessage.trim()) return;

       setIsLoading(true);

       try {
        const response = await fetch("/api/chat",{
          method:"POST",
         headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: inputMessage }),

        })

        const data = await response.json()
        let parsed = null


        try{
          let clean = data.response.replace(/```json|```/g, "").trim()
          parsed= JSON.parse(clean)
      

       } catch {
          parsed = null;
       }

       if(parsed?.destination){

        const hotelsWithImages = await fetchImage("accommodation",parsed.accommodation,)

        const foodWithImages = await fetchImage("food", parsed.food,)

        setTripData({...parsed ,accommodation:hotelsWithImages, food: foodWithImages })
       }else{
        alert("add your destination")
       }

      }

      catch (err) {
      console.error(err);
      alert("❌ API error: " + err.message);
    }
    setInputMessage("");
     setIsLoading(false);
       
    }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6'>
      <form onSubmit={handleSubmit} className="mb-6">

          <textarea
         
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="🌍 Hi there! I'm your AI trip planner. Tell me about your dream destination, budget, or dates... ✈️"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3"
          rows="2"
          disabled={isLoading}
        />

        <div className='flex gap-2 flex-wrap mb-3'>
          {examplePrompts.map((prompt)=> (
            <button
            
             type="button"
            onClick={() => setInputMessage(prompt)}
            
            className='text-xs px-3 py-1 bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors'>
                {prompt}

            </button>
          ))}

        </div>

        <Button  disabled={!inputMessage.trim() || isLoading}>  {isLoading ? "⏳ Planning..." : "🚀 Plan Trip"}</Button>



      </form>


        {/* ===== Results Section ===== */}


        {tripData && (
          <div className='space-y-7'>
         <h2 className="text-3xl font-bold text-gray-800">🌍 {tripData?.destination}</h2>
          <p className="text-gray-600 text-lg">🗓️ Best Time: {tripData?.best_time}</p>


            {/* Budget Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold flex items-center gap-2">💰 Budget</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Low: {tripData?.budget?.low}</li>
              <li>Mid: {tripData?.budget?.mid}</li>
              <li>High: {tripData?.budget?.high}</li>
            </ul>
          </div>


           {/* Itinerary Card */}

            <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold flex items-center gap-2">📅 Itinerary</h3>
            {tripData?.itinerary?.map((day, i) => (
              <div key={i} className="mt-3">
                <p className="font-medium">Day {day.day}:</p>
                <ul className="list-disc pl-5 text-gray-700 mt-1 space-y-1">
                  {day.activities.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

            {/* Accommodation Card */}


            <div className='bg-white p-6 rounded-2xl shadow-lg space-y-3'>
            <h3 className="text-xl font-semibold flex items-center gap-2">🏨 Accommodation</h3>

              {tripData?.accommodation?.map((hotel)=> (
                  <div className='flex items-center gap-4  bg-gray-50 p-4 rounded-xl'>

                <img src={hotel?.image || "https://via.placeholder.com/100"} className="w-24 h-24 object-cover rounded-xl" />

                <div>
                  <h4 className="font-semibold">{hotel?.name}</h4>
                  <p className="text-gray-600">{hotel?.type} • {hotel?.price}</p>
                </div>

              </div>
              ))}
              

            </div>



             {/* Food Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-3">
            <h3 className="text-xl font-semibold flex items-center gap-2">🍴 Food</h3>
            {tripData?.food?.map((f, i) => (
              <div key={i} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl">
                <img
               src={f.image || "https://via.placeholder.com/80"}
                  alt={f.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <p className="text-gray-700">{f?.name} - {f?.price}</p>
              </div>
            ))}
          </div>


            {/* Transportation */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold flex items-center gap-2">🚇 Transportation</h3>
            <p className="text-gray-700 mt-2">{tripData?.transportation}</p>
          </div>



            {/* Tips */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold flex items-center gap-2">💡 Tips</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              {tripData?.tips?.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          </div>

        )}
    </div>
  )
}

export default page