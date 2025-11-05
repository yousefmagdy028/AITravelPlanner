import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-around p-4 sm:p-6 md:p-8 lg:p-10 gap-6 lg:gap-8'>
       <div className='w-full lg:w-auto px-2 sm:px-4'>
        <h2 className='text-[#f78547] font-bold text-xl sm:text-2xl md:text-3xl lg:text-[35px]'>
          Best Destinations around the world
        </h2>
        
        <p className='text-[#14183E] text-3xl sm:text-4xl md:text-5xl lg:text-[70px] font-bold max-w-full lg:w-[450px] mt-3 sm:mt-4'>
          Travel, enjoy and live a new and full life
        </p>

        <p className='text-[#14183E] text-base sm:text-lg md:text-xl lg:text-[20px] max-w-full sm:max-w-md lg:w-[350px] mt-3 sm:mt-4 leading-relaxed'>
          Built Wicket longer admire do barton vanity itself do in it.
          Preferred to sportsmen it engrossed listening. Park gate
          sell they west hard for the.
        </p>

        <Button className="mt-4 sm:mt-5 w-full sm:w-auto">
          Find out more
        </Button>
       </div>

        <div className='w-full lg:w-1/2 flex justify-center px-4 sm:px-6 lg:px-0'>
          <Image 
            src="/hero-img.png" 
            width={700} 
            height={700}   
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px] h-auto object-contain"
            alt="Travel destination"
          />
        </div>
    </div>
  )
}

export default Hero