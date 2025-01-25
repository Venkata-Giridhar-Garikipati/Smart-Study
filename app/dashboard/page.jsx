"use client";
import React from 'react';
import WelcomeBanner from './_components/WelcomeBanner';
import CourseList from './_components/CourseList';
import Link from 'next/link';

function Dashboard() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <WelcomeBanner />
      <CourseList />

      {/* Chatbot Icon */}
      <Link href="/chat" className="fixed bottom-4 right-4">
        <div className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200">
          {/* Chatbot Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10v.2M12 10v.2M16 10v.2M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
}

export default Dashboard;