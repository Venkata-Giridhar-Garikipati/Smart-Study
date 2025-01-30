"use client"
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'

function CourseHeader() {
  const { user } = useUser();
  return (
    <div className='p-5 bg-white/70 backdrop-blur-sm border-b transition-all duration-300 hover:shadow-md flex justify-between items-center sticky top-0 z-50'>
      {/* Logo and Title */}
      <div className='flex items-center gap-3'>
        <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
        <h2 className='font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
          Study Smart
        </h2>
      </div>

      {/* User Info and Button */}
      <div className='flex items-center gap-3'>
        <h2 className='text-md font-medium text-gray-700 p-2 animate-fade-in'>
           {user?.fullName}
        </h2>
        <div className='transform hover:scale-105 transition-transform duration-200'>
          <UserButton />
        </div>
      </div>
    </div>
  )
}

export default CourseHeader
