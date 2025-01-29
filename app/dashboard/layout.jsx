"use client"
import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import DashboardHeader from "./_components/DashboardHeader";
import { CourseCountContext } from "../_context/CourseCountContext";
import { Menu, X } from "lucide-react";

function DashboardLayout({ children }) {
  const [totalCourse, setTotalCourse] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>

        {/* Sidebar */}
        <div
          className={`
            fixed top-0 left-0 h-full bg-white z-40
            transform transition-transform duration-300 ease-in-out
            md:transform-none md:w-64 md:block
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            ${isMobileMenuOpen ? 'w-[80%] shadow-xl' : 'w-64'}
          `}
        >
          <SideBar />
        </div>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Main Content */}
        <div 
          className={`
            transition-all duration-300 ease-in-out
            md:ml-64 min-h-screen
            ${isMobileMenuOpen ? 'blur-sm md:blur-none' : ''}
          `}
        >
          <div className="sticky top-0 z-20">
            <DashboardHeader />
          </div>
          
          <main className="p-4 md:p-8 pt-20 md:pt-8 max-w-7xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-auto p-6 text-center text-gray-500 text-sm">
            <p>© 2025 Study Smart. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </CourseCountContext.Provider>
  );
}

export default DashboardLayout;