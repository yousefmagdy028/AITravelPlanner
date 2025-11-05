import Image from 'next/image'
import React from 'react'

function Offers() {

     const category = [
    {
      id: 1,
      icon: "/icon1.png", 
      title: "Calculated Weather",
      desc: "Built Wicket longer admire do barton vanity itself do in it."
    },
    {
      id: 2,
      icon: "/icon2.png",
      title: "Best Flights",
      desc: "Engrossed listening. Park gate sell they west hard for the."
    },
    {
      id: 3,
      icon: "/icon3.png",
      title: "Local Events",
      desc: "Barton vanity itself do in it. Preferred to men it engrossed listening."
    },
    {
      id: 4,
      icon: "/icon4.png",
      title: "Customization",
      desc: "We deliver outsourced aviation services for military customers"
    }
  ]
  
  return (
    <div className='max-w-6xl mx-auto flex flex-col items-center justify-center mt-10 px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-[45px] text-[#f78547] font-bold text-center mb-8 sm:mb-10 lg:mb-12'>
          We Offer Best Services
        </h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full'>
            {category?.map((cat) => (
                <div 
                  key={cat.id}
                  className='flex flex-col items-center text-center p-6 sm:p-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:bg-[#f78547] group cursor-pointer'
                >
                    <div className='w-16 h-16 sm:w-20 sm:h-20 relative'>
                      <Image 
                        src={cat.icon} 
                        fill
                        className='object-contain'
                        alt={cat.title}
                      />
                    </div>
                    
                    <h3 className='mt-4 sm:mt-6 font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-5 text-[#f78547] group-hover:text-white transition-colors'>
                      {cat.title}
                    </h3>

                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed group-hover:text-white transition-colors">
                      {cat.desc}
                    </p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Offers