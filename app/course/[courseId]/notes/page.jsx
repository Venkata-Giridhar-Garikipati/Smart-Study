"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/solid'; // Import Icons
import ChatBox from '@/components/ChatBox'; // Import the ChatBox component

function ViewNotes() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleToggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const {courseId} = useParams();
    const [notes,setNotes]=useState();
    const [stepCount,setStepCount]=useState(0);
    const route = useRouter();

    useEffect(()=>{
        GetNotes();
    },[])
    const GetNotes= async()=>{
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'notes'
        })
        console.log(result?.data);
        setNotes(result?.data);
    }

    return notes&&(
        <div className="p-6 relative min-h-screen overflow-y-auto"> {/* Add relative and min-h-screen to allow scrolling */}
            {/* Notes Section */}
            <div className='flex flex-col'>
                {/* Progress Bar */}
                <div className='flex gap-3 items-center mb-4'>
                    {stepCount!=0?<Button variant="outline" size='sm' className="rounded-full shadow-sm" onClick={()=>setStepCount(stepCount-1)}><ChevronLeftIcon className="h-6 w-6"/></Button>:''}
                    <div className="flex-1 flex items-center justify-center space-x-1">
                        {notes?.map((item,index)=>(
                            <div key={index} className={`w-full h-2 rounded-full ${index<stepCount?'bg-primary':'bg-gray-200'}`}>
                            </div>
                        ))}
                    </div>

                    <Button variant="outline" size='sm' className="rounded-full shadow-sm" onClick={()=>setStepCount(stepCount+1)}><ChevronRightIcon className="h-6 w-6"/></Button>

                </div>

                {/* Content Area */}
                <div className='mt-2 border rounded-lg shadow-md p-6 bg-white'>
                    <div className="prose prose-sm" dangerouslySetInnerHTML={{__html:(notes[stepCount]?.notes)?.replace('```html','')}}/>
                    {notes?.length==stepCount&&<div className='flex items-center gap-4 flex-col justify-center mt-6'>
                        <h2 className="text-lg font-semibold">End of Notes!!</h2>
                        <Button className="rounded-full shadow-md" onClick={()=>route.back()}>Go to Course Page</Button>
                    </div>}
                </div>
                {/* Content Area End */}
            </div>

            {/* Chatbot Icon */}
            <button
                onClick={handleToggleChat}
                className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 z-50"  //Increased p and positioning
            >
                {isChatOpen ? <XMarkIcon className="h-7 w-7"/> : <ChatBubbleLeftRightIcon className="h-7 w-7"/>}
            </button>

            {/* Chat Box Component (conditionally rendered) */}
            {isChatOpen && (
                <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-md z-50 w-[350px] h-[450px] overflow-hidden"> {/* added overflow hidden to clip content */}

                <ChatBox onClose={()=>setIsChatOpen(false)}/>
                </div>
            )}
        </div>
    )
}

export default ViewNotes;