"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { CourseCountContext } from '@/app/_context/CourseCountContext'
function SideBar() {
    const MenuList = [
        {
            name:'Dashboard',
            icon:LayoutDashboard,
            path:'/dashboard'
        },
        {
            name:'Upgrade',
            icon:Shield,
            path:'/dashboard/upgrade'
        },
        {
            name:'Profile',
            icon:UserCircle,
            path:'/dashboard/profile'
        },
    ]

    const {totalCourse,setTotalCourse} = useContext(CourseCountContext);
    const path = usePathname();
    return (
        <div className='h-screen border-r bg-white/70 backdrop-blur-sm shadow-lg items-center p-5 transition-all duration-300'>
          <div className='flex gap-2 items-center hover:scale-105 transition-transform duration-200'>
            <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
            <h2 className='font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
              Study Smart
            </h2>
          </div>
          
          <div className='mt-10 space-y-6'>
            <Link href={'/create'}>
              <Button className='w-full floating-button bg-gradient-to-r from-blue-600 to-blue-400'>
                + Create New
              </Button>
            </Link>
            
            <div className='space-y-2'>
              {MenuList.map((menu,index)=>(
                <Link href={menu.path} key={index}>
                  <div className={`flex gap-5 items-center p-3 rounded-lg cursor-pointer
                    nav-item ${path==menu.path ? 'bg-blue-50 dark:bg-blue-900' : ''}`}>
                    <menu.icon className='text-blue-600'/>
                    <h2>{menu.name}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className='glass-effect p-4 rounded-lg absolute bottom-10 w-[87%] border
            hover:shadow-xl transition-all duration-300'>
            <h2 className='text-lg mb-2 font-semibold'> Available Credits : 10</h2>
            <Progress value={(totalCourse/10)*100} className='progress-animation'/>
            <h2 className='text-sm mt-2'>{totalCourse} Out of 10 Credits Used</h2>
            <Link href={'/dashboard/upgrade'} 
              className='text-blue-600 text-xs mt-3 hover:text-blue-700 transition-colors duration-200'>
              Upgrade to create more
            </Link>
          </div>
        </div>
      )
    }
    
export default SideBar