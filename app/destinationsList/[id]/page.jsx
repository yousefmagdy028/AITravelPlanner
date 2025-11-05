"use client"
import { Button } from '@/components/ui/button';
import { Activity, Calendar, Clock, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {
      const [destinations, setDestinations] = useState(null)
      const [loading, setLoading] = useState(true);
    const [error,setError]= useState(null)
      const params = useParams()
    const router = useRouter()


      useEffect(()=>{
        if(params.id){
            fetchDestinations()
        }
      },[params.id])

      const fetchDestinations = async ()=> {
    try {
      const response = await fetch ("/api/destinations")

      const result =  await response.json()
        if(result.success){
            const foundDestination = result.data.find(dest => dest.id === parseInt(params.id))
            if(foundDestination){
                setDestinations(foundDestination)
            }else{
               setError("destination not found")
            }
        }else{
              setError('Failed to fetch destination');
            }




    }catch(error){
  setError('Error loading destination');
            console.error('Error:', error);
    }finally{
         setLoading(false)
    }
}

 if(loading){

    return(
 <div className=' min-h-screen flex items-center justify-center'>
   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f78547]"></div>

    </div>
    )
   
  }

   const handleBookNow=()=> {
    router.push(`/checkout?destinationId=${destinations.id}&name=${encodeURIComponent(destinations.name)}&price=${destinations.price}`)
   }
    
  return (

    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-orange-50'>

    
    <div className='max-w-7xl mx-auto px-5 py-5  '>

        

        {/* Hero Section */}

        <div className='relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl'>

        {destinations.imageUrl && (
            <Image  className="w-full h-full object-cover" width={400} height={400} src={destinations.imageUrl} alt={"DestinationsList image"}/>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
           <div className='absolute bottom-0 right-0 left-0 p-8 text-white '>
            <h1 className='font-bold text-[30px]'>{destinations?.name}</h1>
            <div className='flex items-center text-xl md:text-2xl'>

              <MapPin className='w-6 h-6 mr-2'/>  
                <span>{destinations?.country}, {destinations?.city}</span>
            </div>
            
            </div> 
        </div>

        <div>
             {/* main content */}

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2  space-y-8'>
                {/* description */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About This Destination</h2>
             <p className="text-gray-700 text-lg leading-relaxed">{destinations.description}</p>
             </div>   

                  {/* Highlights  */}

                  <div className="bg-white rounded-xl p-8 shadow-lg">

                  <div className='flex items-center mb-6'>
                    <Star className='w-8 h-8 text-[#f78547] mr-3'/>
                    <h2>Highlights</h2>

                    </div>  
                <div className='text-gray-700 text-lg leading-relaxed'>
                    {destinations?.highlights?.split(",").map((hightlight)=> (
                      <div className='flex items-start mb-3'>

                   <span className="text-[#f78547] mr-3 mt-1">•</span>  
                    <span>{hightlight.trim()}</span>     

                  </div>
                    ))}
                    </div>    
                  </div>

               {/* Activities */}


               <div className='bg-white rounded-xl p-8 shadow-lg'>
                
                <div className='flex items-center mb-6'>
                    <Activity className='w-8 h-8 text-[#f78547] mr-3'/>
                    <h2>Activities</h2>

                    </div>

                 <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

                {destinations?.activities.split(",").map((activity)=> (

                <div className='bg-gradient-to-r from-[#f78547]/10 to-orange-100 p-4 rounded-lg border-l-4 border-[#f78547]'>

                    <span className='font-semibold text-gray-800'>{activity.trim()}</span>
                </div>    
                ))}    
                    </div>   



                </div>  




            </div>

             {/* Booking Sidebar */}

        <div className='lg:col-span-1'>
            
            <div className='bg-white rounded-xl p-8 shadow-lg sticky top-24'>
           <div className='text-center mb-8'>
                <strong className=' mb-2 font-bold text-[#f78547]'>{destinations?.price} $ Per Person</strong>

           </div>

          {/* Trip Details */}

          <div className='space-y-4 mb-8'>
            <div className='flex items-center p-4 bg-gray-50 rounded-lg'>

           <Clock className='w-6 h-6 text-[#f78547] mr-4'/>

           <div>
            <p className='text-[#f78547]'>Duration</p>
            <p className='text-gray-600'>{destinations?.duration}</p>
           </div>
            </div>
          </div>


           

          <div className='space-y-4 mb-8'>
            <div className='flex items-center p-4 bg-gray-50 rounded-lg'>

           <Calendar  className='w-6 h-6 text-[#f78547] mr-4'/>

           <div>
            <p className='text-[#f78547]'>Best Season</p>
            <p className='text-gray-600'>{destinations?.bestSeason}</p>
           </div>
            </div>
          </div>



            <div className='space-y-4 mb-8'>
            <div className='flex items-center p-4 bg-gray-50 rounded-lg'>

           <MapPin  className='w-6 h-6 text-[#f78547] mr-4'/>

           <div>
            <p className='text-[#f78547]'>Location</p>
            <p className='text-gray-600'>{destinations?.country} , {destinations?.city}</p>
           </div>
            </div>
          </div>

          <Button onClick={handleBookNow} className="w-full">Book Now</Button>

            </div>
        </div>   
             
            </div>  

 
              
        </div>
    </div>
 
    </div>
  )
}

export default page