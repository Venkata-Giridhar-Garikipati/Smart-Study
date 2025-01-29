"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { CourseCountContext } from '@/app/_context/CourseCountContext';

function CourseList() {
  const {user} = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const {totalCourse, setTotalCourse} = useContext(CourseCountContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    user && GetCourseList();
  }, [user])

  const GetCourseList = async () => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      const result = await axios.post('/api/courses', {
        createdBy: user?.primaryEmailAddress?.emailAddress
      });
      setCourseList(result.data.result);
      setTotalCourse(result.data.result?.length);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }

  return (
    <div className="mt-10 px-4">
      <div className="mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Your Study Material
          </h2>
          <Button 
            variant="outline" 
            onClick={GetCourseList}
            disabled={loading}
            className="border-blue-500 text-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : 'transition-transform duration-300 hover:rotate-180'}`}/>
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading ? (
          courseList?.length > 0 ? (
            courseList.map((course, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-300 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeIn 0.5s ease-out forwards'
                }}
              >
                <CourseCardItem course={course} />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
              <div className="text-gray-500 mb-4">
                No courses found. Start creating your first course!
              </div>
              <Button 
                onClick={GetCourseList}
                className="bg-blue-500 hover:bg-blue-600 transition-all duration-300"
              >
                Refresh List
              </Button>
            </div>
          )
        ) : (
          [...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="transform transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeIn 0.5s ease-out forwards'
              }}
            >
              <div className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="h-56 space-y-4 p-6">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 bg-slate-200 rounded-lg animate-pulse"/>
                    <div className="w-24 h-6 bg-slate-200 rounded-full animate-pulse"/>
                  </div>
                  <div className="w-3/4 h-6 bg-slate-200 rounded animate-pulse"/>
                  <div className="w-full h-4 bg-slate-200 rounded animate-pulse"/>
                  <div className="w-full h-2 bg-slate-200 rounded animate-pulse"/>
                  <div className="flex justify-end">
                    <div className="w-20 h-8 bg-slate-200 rounded animate-pulse"/>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default CourseList;