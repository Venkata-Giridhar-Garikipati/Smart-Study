
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link';
import { toast } from 'sonner';

function MaterialCardItem({item,studyTypeContent,course,refreshData}) {
 

  const[loading,setLoading]=useState(false);
  const GenerateContent = async () => {
    try {
        toast("Generating your content..");
        setLoading(true);
        console.log("Course:", course);

        let chapters = '';
        course?.courseLayout?.chapters?.forEach((chapter) => {
            chapters = (chapter.chapter_title||chapter.chapterTitle)+','+chapters
        });
        console.log("Chapters:", chapters);

        const result = await axios.post('/api/study-type-content', {
            courseId: course?.courseId,
            type: item.type,
            chapters: chapters,
        });
       
        setLoading(false);
        console.log("Result:", result);
        refreshData(true);
        toast("Your content is ready to view");
    } catch (error) {
        setLoading(false);
        console.error("Error Response Data:", error.response?.data || error.message);
        toast.error("Failed to generate content. Please try again later.");
    }
};

  return (
    <Link href={'/course/'+course?.courseId+item.path}>
    <div className={`border shadow-md rounded-lg p-5  flex flex-col items-center
        ${studyTypeContent?.[item.type]?.length===0&&'grayscale'}
    `}>
        {studyTypeContent?.[item.type]?.length===0?
        <h2 className='p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2'>Generate</h2>
        : <h2 className='p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2'>Ready</h2>}
        <Image src={item.icon} alt={item.name} width={50} height={50}/>
        <h2 className='font-medium mt-3'>{item.name}</h2>
        <p className='text-gray-500 text-sm text-center'>{item.desc}</p>
        {studyTypeContent?.[item.type]?.length===0?
        <Button className="mt-3 w-full" variant="outline" onClick={()=>GenerateContent()}>
          {loading&&<RefreshCcw className='animate-spin'/>}Generate</Button>
        :<Link href={'/course/'+course?.courseId+item.path}>
        <Button className="mt-3 w-full" variant="outline">View</Button></Link>}
    </div>
   </Link>
  
  )
}

export default MaterialCardItem