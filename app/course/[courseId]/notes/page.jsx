"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { MessageSquare, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

const ViewNotes = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const { courseId } = useParams();
  const router = useRouter();

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleNext = () => {
    if (stepCount < notes.length - 1) {
      setStepCount(stepCount + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (stepCount > 0) {
      setStepCount(stepCount - 1);
    }
  };

  const handleGoBack = () => {
    router.push(`/course/${courseId}`);
  };

  const handleRestartNotes = () => {
    setStepCount(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post('/api/study-type', {
          courseId: courseId,
          studyType: 'notes',
        });
        if (response.data && Array.isArray(response.data)) {
          setNotes(response.data);
        } else {
          setError("Invalid data received from server.");
          console.error("Invalid data format:", response.data);
        }
      } catch (err) {
        setError('Failed to load notes.');
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex space-x-1">
          <div className="h-2 w-2 animate-ping rounded-full bg-blue-600"></div>
          <div className="h-2 w-2 animate-ping rounded-full bg-blue-600 delay-75"></div>
          <div className="h-2 w-2 animate-ping rounded-full bg-blue-600 delay-150"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="mx-4 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="text-center">
            <X className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-2 text-lg font-semibold text-gray-900">Error Loading Notes</h3>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
            <button
              onClick={handleGoBack}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Return to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="mx-4 w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 p-2">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Congratulations!</h2>
          <p className="mb-6 text-gray-600">You've completed all the notes in this section.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRestartNotes}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Review Notes Again
            </button>
            <button
              onClick={handleGoBack}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Return to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-5 md:mx-10 lg:mx-20 xl:mx-32 mt-10 px-5 py-6 bg-white rounded-lg shadow-lg'>
  
    
      {/* <header className="fixed left-0 right-0 top-0 z-20 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </button>
          <span className="text-sm font-medium text-slate-600">
            Note {stepCount + 1} of {notes.length}
          </span>
        </div>
      </header> */}
     
      

      {/* Main Content */}
      <main className="mx-auto max-w-[1400px] px-4 pt-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Navigation Sidebar */}
          <div className="col-span-3 hidden lg:block">
            <div className="sticky top-20 rounded-xl border bg-white p-4 shadow-sm">
              <h3 className="mb-3 font-medium text-slate-900">Notes Overview</h3>
              <div className="space-y-1">
                {notes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setStepCount(index)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      index === stepCount
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Chapter {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-span-12 lg:col-span-9">
            <div className="mb-4 flex items-center justify-between gap-4">
              <button
                onClick={handlePrevious}
                disabled={stepCount === 0}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  stepCount === 0
                    ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-white text-slate-600 shadow-sm hover:bg-slate-50'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <div className="h-1.5 flex-1 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${((stepCount + 1) / notes.length) * 100}%` }}
                />
              </div>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
              >
                {stepCount === notes.length - 1 ? 'Complete' : 'Next'}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              {notes[stepCount]?.notes ? (
                <div className="prose prose-slate max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: notes[stepCount]?.notes?.replace(/```html/g, "").replace(/```/g, ""),
                    }}
                  />
                </div>
              ) : (
                <div className="flex min-h-[300px] items-center justify-center">
                  <p className="text-slate-500">No content available for this section</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Chat Button */}
      <button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        {isChatOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </button>

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 h-[500px] w-[380px] overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex h-full flex-col">
            <div className="border-b px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-900">Chat Support</h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="rounded-lg p-1 hover:bg-slate-100"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center p-4 text-slate-500">
              Chat functionality coming soon
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default ViewNotes;