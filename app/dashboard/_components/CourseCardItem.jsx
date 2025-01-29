import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RefreshCw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


function CourseCardItem({course}) {
    return (
      <div className='border rounded-lg p-5 card-hover bg-white/80 backdrop-blur-sm'>
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <div className='transform hover:rotate-12 transition-transform duration-300'>
              <Image src={'/knowledge.png'} alt='other' width={50} height={50}/>
            </div>
            <h2 className='text-[10px] p-1 px-2 rounded-full bg-blue-600 text-white
              animate-pulse'>
              20 Jan 2025
            </h2>
          </div>
          
          <h2 className='mt-3 font-medium text-lg hover:text-blue-600 transition-colors duration-200'>
            {course?.courseLayout?.courseTitle}
          </h2>
          
          <p className='text-sm line-clamp-2 text-gray-500 mt-2 hover:line-clamp-none transition-all duration-300'>
            {course?.courseLayout?.courseSummary}
          </p>
          
          <div className='mt-3'>
            <Progress 
              value={0} 
              className='progress-animation'
            />
          </div>
          
          <div className='mt-3 flex justify-end'>
            {course?.status == 'Generating' ? (
              <h2 className='text-sm p-1 px-2 flex gap-2 items-center rounded-full bg-gray-400 text-white'>
                <RefreshCw className='h-5 w-3 animate-spin'/>
                Generating...
              </h2>
            ) : (
              <Link href={'/course/'+course?.courseId}>
                <Button className='floating-button'>
                  View Course
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  

export default CourseCardItem