import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Destination() {
  const destination = [
    {
      id: 1,
      img: "/dest1.jpg", 
      title: "Rome, Italty",
      desc: "10 Days Trip.",
      price:"1500$"
    },
    {
      id: 2,
      img: "/dest2.jpg",
      title: "London, UK",
      desc: "12 Days Trip.",
      price:"2400$"
    },
    {
      id: 3,
      img: "/dest3.jpg",
      title: "Full Europe",
      desc: "15 Days Trip.",
      price:"800$"
    },

    {
      id: 4,
      img: "/dest4.png",
      title: "Istanbul",
      desc: "10 Days Trip.",
      price:"1900$"
    },
    
  ]
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
     <h2 className='text-[45px] text-[#f78547]'>Top Destinations</h2>
     

     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
    
                {destination?.map((dest)=>(
                    <div className='flex flex-col items-center text-center p-4 rounded-lg hover:shadow-lg transition duration-300  hover:bg-[#f78547]  group cursor-pointer'>
                        <Image src={dest.img} alt={dest.title || "Destination image"} width={400} height={400}/>
                        <h3 className='mt-4 font-semibold text-lg  mb-5 text-[#f78547] group-hover:text-white'>{dest.title}</h3>
    
                   <p className="mt-2 text-gray-500 text-sm group-hover:text-white">{dest.desc}</p>
    
                    </div>
                ))}
                

    
            </div>
            <div className='text-center w-full  mt-2 mb-10'>
              <Link  href="/destinationsList"><Button>See All <ArrowRight/> </Button></Link>    
                </div>
    </div>
  )
}

export default Destination