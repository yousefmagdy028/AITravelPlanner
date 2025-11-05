"use client"
import { Button } from '@/components/ui/button';
import { DollarSign, LocateIcon, MapIcon, MapPin, Plane } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function destinationsList() {

  const [destinations, setDestinations] = useState([])

  const [loading, setLoading] = useState(true);

 useEffect(() => {
        fetchDestinations();
    }, []);

  const fetchDestinations = async ()=> {
    try {
      const response = await fetch ("/api/destinations")

      const result =  await response.json()
      setDestinations(result.data)
    } catch (error) {
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
  return (
    <div className='min-h-screen bg-gray-50 py-8'>

      <div className='max-w-7xl mx-auto px-4'>
      <h4 className=' border-b my-6 border-b-[#f78547] text-[#f78547] font-bold text-[30px]'>Destinations </h4>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

        {destinations?.map((des)=> (

          <div className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>


            <div className='  w-full overflow-hidden'>
            <Image className=' w-full hover:scale-110 transition-transform duration-500' src={des?.imageUrl} width={350} height={350}/>
          </div>

           {/* Content */}


           <div className=' p-5'>
            <h3 className='text-2xl font-bold text-gray-800 mb-3'>{des?.name}</h3>


            <div className='flex items-center text-gray-600 mb-4'>

            <MapPin className='text-[#f78547] text-[17px]'/>
            <span className='ml-2'>{des?.country} , {des?.city}  </span>

           </div>

           <p className='text-gray-700 mb-4 text-sm leading-relaxed truncate'>

            {des?.description}
           </p>

           <div className='flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg'>
            <div className='text-center '>
              <strong className='text-2xl font-bold text-[#f78547]'> {des?.price} $</strong>
            </div>

            <div className='text-center '>
              <strong className=' flex items-center text-2xl font-bold text-[#f78547]'><Plane className='mr-2'/>  {des?.duration} Trip</strong>
            </div>


           </div>

           </div>
          <div className=' rounded-3xl p-6'>
   <Link href={`/destinationsList/${des?.id}`}>    <Button className="w-full ">Book Now</Button> </Link> 
          </div>
          </div>

          

        ))}

      </div>
      </div>
    </div>
  )
}

export default destinationsList