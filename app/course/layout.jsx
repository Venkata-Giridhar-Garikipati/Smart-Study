import React from 'react'
import CourseHeader from './[courseId]/_components/CourseHeader'

function CourseViewLayout({children}) {
  return (
    <div>
            <CourseHeader />
       
        <div className='mx-10 md:mx-32 lg:px-58 mt-10'>
            {children}
            </div>
        </div>
  )
}

export default CourseViewLayout