import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const protectedRoute = ({children}) => {
    const {user}=useAuth()
    const router=useRouter()
    useEffect(()=>{
        if(!user){
            router.push("/login")
        }
    },[router,user])
  return (
    <>
    {user?children:null}
    </>
  )
}

export default protectedRoute