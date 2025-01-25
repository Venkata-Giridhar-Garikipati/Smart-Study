import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import { db } from '@/configs/db'
import axios from 'axios'


function StudyMaterialSection({courseId,course}) {

    const [studyTypeContent,setStudyTypeContent]=useState();

    const MaterialList=[
        {
            name:'Notes/Chapters',
            desc:'Read notes to prepare it',
            icon:'/notes.png',
            path:'/notes',
            type: 'notes'
        },
        {
            name:'Flashcards',
            desc:'Flashcard help to remember the concepts',
            icon:'/flashcard.png',
            path:'/flashcards',
            type:'flashcards'
        },
        {
            name:'quiz',
            desc:'Great way to test your knowledge',
            icon:'/quiz.png',
            path:'/quiz',
            type:'quiz'
        },
        {
            name:'Question/Answer',
            desc:'Help to practice your learning',
            icon:'/qa.png',
            path:'/qa',
            type:'qa'
        },
    ]
    useEffect(()=>{
        GetStudyMaterial();
    },[])

    const GetStudyMaterial = async () => {
        try {
            console.log("Request Payload:", { courseId, studyType: "ALL" });
            const result = await axios.post('/api/study-type', {
                courseId: courseId,
                studyType: 'ALL',
            });
            console.log("Response Data:", result.data);
            setStudyTypeContent(result.data);
        } catch (error) {
            console.error("Error Response Data:", error.response?.data || error.message);
            alert('Failed to fetch study materials. Please try again later.');
        }
    };
    
      

  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl'>Study Material</h2>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
            {MaterialList.map((item,index)=>(
             
                <MaterialCardItem item={item} key={index}
                    studyTypeContent={studyTypeContent}
                    course={course}
                   // courseId={courseId}
                    refreshData={GetStudyMaterial}
                />
               
                                               
            ))}
        </div>
    </div>
  )
}

export default StudyMaterialSection