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
    <div className='h-screen shadow-md items-center p-5'>
        <div className='flex gap-2'>
            <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
            <h2 className='font-bold text-2xl'>Study Smart</h2>
        </div>
        <div className='mt-10'>
            <Link href={'/create'}>
            <Button className='w-full'>+  Create New</Button>
            </Link>
            <div className='mt-5'>
                {MenuList.map((menu,index)=>(
                    <Link href={menu.path} key={index}>
                    <div className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path==menu.path&&'bg-slate-200'}`}>
                        <menu.icon/>
                        <h2>{menu.name}</h2>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
        <div className='border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[87%]'>
            <h2 className='text-lg mb-2'> Available Credits : 10</h2>
            <Progress value={(totalCourse/10)*100} />
            <h2  className='text-sm'>{totalCourse} Out of 10 Credits Used</h2>
            <Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'>Upgrade to create more</Link>
        </div>
    </div>
  )
}

export default SideBar