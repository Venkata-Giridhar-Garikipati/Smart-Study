"use client";
import React from "react";
import Link from "next/link";
import {
  FaUserPlus,
  FaBook,
  FaQuestionCircle,
  FaClipboardList,
  FaRobot,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { MdOutlinePrivacyTip, MdOutlineContactPage } from "react-icons/md";
import Image from "next/image";

const HomePage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 animate-slide-down">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Study Smart Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold text-blue-600">Study Smart</h1>
          </div>
          <Link
            href="/sign-in"
            className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition duration-200"
          >
            <FaUserPlus className="mr-1" /> Log In
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center text-white flex items-center justify-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/featured/?education,learning')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-transparent opacity-80"></div>
        <div className="relative text-center max-w-3xl px-6 animate-fade-in">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg animate-slide-up">
            Revolutionize Your Learning with AI
          </h1>
          <p className="text-xl font-light mb-8 animate-fade-in-delayed">
            Create personalized study materials, flashcards, quizzes, and Q&A sets
            in seconds. Get 24/7 AI chatbot support for all your study doubts.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-200 animate-bounce-slow"
            >
              Get Started
            </Link>
            <Link
              href="/learn-more"
              className="bg-white hover:bg-gray-200 text-blue-600 font-medium py-3 px-6 rounded-lg shadow-lg transition duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Same content, animations verified */}
       {/* Features Section */}
       <main className="container mx-auto px-6 py-16">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "Smart Summarization",
              description:
                "Quickly condense textbooks, articles, or notes into concise summaries.",
              icon: <FaClipboardList className="text-blue-600 text-3xl mr-4 animate-bounce" />,
            },
            {
              title: "Flashcards",
              description:
                "Create interactive flashcards to reinforce your memory and retain concepts faster.",
              icon: <FaClipboardList className="text-blue-600 text-3xl mr-4 animate-spin-slow" />,
            },
            {
              title: "Custom Quizzes",
              description:
                "Generate topic-specific quizzes with varying difficulty to test your understanding.",
              icon: <FaQuestionCircle className="text-blue-600 text-3xl mr-4 animate-bounce" />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 flex items-start animate-zoom-in"
            >
              {feature.icon}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h2>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* How It Works Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 animate-slide-up">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1. Enter Your Topic",
                description: "Provide the subject or concept you want to study or review.",
                icon: <FaRobot className="text-blue-600 text-3xl mr-4" />,
              },
              {
                step: "2. Choose Your Tools",
                description:
                  "Select from summaries, quizzes, flashcards, or Q&A formats.",
                icon: <FaClipboardList className="text-blue-600 text-3xl mr-4" />,
              },
              {
                step: "3. Get Instant Help",
                description:
                  "Use AI-generated content or ask our chatbot for guidance.",
                icon: <FaRobot className="text-blue-600 text-3xl mr-4" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 flex items-start animate-fade-in-delayed"
              >
                {item.icon}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.step}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      
      {/* Contact Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto text-center animate-slide-up">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-gray-700 mb-8">Have questions or need support? We're here to help.</p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center text-blue-600">
              <FaPhoneAlt className="text-2xl mr-2 animate-bounce" />
              <span className="text-lg">+1 234 567 890</span>
            </div>
            <div className="flex items-center text-blue-600">
              <FaEnvelope className="text-2xl mr-2 animate-fade-in-delayed" />
              <span className="text-lg">support@studysmart.com</span>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-blue-600 to-blue-500 text-white text-center py-8">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
          <p className="text-sm mb-6">© {currentYear} Study Smart. Transforming the way you learn.</p>
          <div className="flex justify-center space-x-4">
            <Link href="#" className="flex items-center hover:text-gray-200">
              <MdOutlinePrivacyTip className="mr-2" /> Privacy Policy
            </Link>
            <Link href="#" className="flex items-center hover:text-gray-200">
              <FaBook className="mr-2" /> Terms of Service
            </Link>
            <Link href="#" className="flex items-center hover:text-gray-200">
              <MdOutlineContactPage className="mr-2" /> Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
