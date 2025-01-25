"use client"
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  const {user} = useUser();
  return (
    <div className='p-5 shadow-md flex justify-end'>
        <h2 className='text-md font-medium text-gray-700 p-2'>{user?.fullName}</h2>
        <UserButton/>

    </div>
  )
}

export default DashboardHeader