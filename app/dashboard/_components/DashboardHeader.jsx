"use client"
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  const {user} = useUser();
  return (
    <div className='p-5 bg-white/70 backdrop-blur-sm border-b transition-all duration-300 hover:shadow-md flex justify-end sticky top-0 z-50'>
      <div className='flex items-center gap-3'>
        <h2 className='text-md font-medium text-gray-700 p-2 animate-fade-in'>
          Welcome, {user?.fullName}
        </h2>
        <div className='transform hover:scale-105 transition-transform duration-200'>
          <UserButton/>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader