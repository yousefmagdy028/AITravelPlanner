"use client"

import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import axios from 'axios'
import { Toaster } from 'sonner'
function Provider({children}) {
  const {user} = useUser()

    useEffect(()=>{
      user &&  createNewUser()
    },[user])

  const createNewUser = async()=> {
        const result = await axios.post("/api/user",{
            name:user?.fullName,
            email:user?.primaryEmailAddress?.emailAddress,
            userId:user?.id,
            
            

        })

        console.log(result.data)
    }


  return (
    <div>{children}
    <Toaster/>
    </div>
  )
}

export default Provider