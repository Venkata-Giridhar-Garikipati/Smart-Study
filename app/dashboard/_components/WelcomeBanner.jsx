"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
  const {user} = useUser();
  
  return (
    <div className='flex p-5 bg-gradient-to-r from-blue-600 to-blue-400 
      w-full text-white rounded-lg items-center gap-6 hover:shadow-xl 
      transition-all duration-300 transform hover:-translate-y-1'>
      <div className='transform hover:scale-110 transition-transform duration-300'>
        <Image src={'/laptop.png'} alt='laptop' width={100} height={100}/>
      </div>
      <div className='space-y-2'>
        <h2 className='font-bold text-3xl animate-fade-in'>
          Hello, {user?.fullName}
        </h2>
        <p className='text-white/90 hover:text-white transition-colors duration-200'>
          Welcome Back, Its time to get back and start learning new course.
        </p>
      </div>
    </div>
  )
}

export default WelcomeBanner