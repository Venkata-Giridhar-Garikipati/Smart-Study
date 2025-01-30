"use client"
import React, { useState } from "react";
import {  Camera, Book, List, Bot, Star, HelpCircle, Phone, Mail, Twitter, Facebook, Linkedin, Quote, User } from "lucide-react";
import Image from "next/image";
import {
  FaUserPlus,
  FaBook,
  FaRobot,
  FaClipboardList,
  FaStar,
  FaQuestionCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
const HomePage = () => {
  const [isOpen, setIsOpen] = useState(null);
  const { isSignedIn } = useUser();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Medical Student",
      content: "Study Smart transformed my study habits. The AI-generated flashcards saved me countless hours of preparation time.",
    },
    {
      name: "Michael Chen",
      role: "Computer Science Major",
      content: "The 24/7 AI tutor helped me grasp complex programming concepts. It's like having a personal teacher always available.",
    },
    {
      name: "Emma Williams",
      role: "Law Student",
      content: "The quiz generation feature helped me prepare for my bar exam. Highly recommended for any serious student!",
    }
  ];

  const faqs = [
    {
      question: "How does the AI flashcard generation work?",
      answer: "Our AI analyzes your study materials and automatically creates optimized flashcards focusing on key concepts and important details. You can customize and edit these cards as needed."
    },
    {
      question: "Is there a limit to how many flashcards I can create?",
      answer: "Free users can create up to 100 flashcards per month. Premium users get unlimited flashcard creation along with advanced features."
    },
    {
      question: "Can I use Study Smart offline?",
      answer: "Yes! You can download your study materials for offline use. However, the AI tutor requires an internet connection."
    },
    {
      question: "How accurate is the AI tutor?",
      answer: "Our AI tutor is trained on vast educational resources and is regularly updated. While highly accurate, we recommend verifying critical information with your course materials."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 animate-slide-down">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Study Smart Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold text-blue-600">Study Smart</h1>
          </div>
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition duration-200"
            >
              Go to Dashboard
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition duration-200">
                <FaUserPlus className="mr-1" /> Log In
              </button>
            </SignInButton>
          )}
        </nav>
      </header>

      {/* Hero Section with Enhanced Gradient */}
      <section
        className="relative h-screen bg-cover bg-center text-white flex items-center justify-center"
        style={{ backgroundImage: "url('/landing.png')" }}
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

      {/* Features Section with Enhanced Cards */}
      <section className="container mx-auto my-24 px-6">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Transform Your Learning Experience
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <Book className="text-blue-500 w-16 h-16 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Smart Flashcards</h3>
            <p className="text-gray-600 leading-relaxed">
              Generate comprehensive flashcard sets instantly. Our AI ensures you focus on what matters most.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <List className="text-blue-500 w-16 h-16 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Adaptive Quizzes</h3>
            <p className="text-gray-600 leading-relaxed">
              Practice with personalized quizzes that adapt to your learning progress and needs.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <Bot className="text-blue-500 w-16 h-16 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-gray-800">AI Tutor</h3>
            <p className="text-gray-600 leading-relaxed">
              Get instant, intelligent answers to your questions anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src="/api/placeholder/64/64"
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <Quote className="text-blue-200 w-8 h-8 mb-4" />
                <p className="text-gray-600 leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="container mx-auto my-24 px-6">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 text-left"
                onClick={() => setIsOpen(isOpen === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  <span className="text-blue-500 text-2xl">
                    {isOpen === index ? '−' : '+'}
                  </span>
                </div>
                {isOpen === index && (
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Contact Form */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-blue-600 p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="mb-8 leading-relaxed">
                  Have questions about our platform? We're here to help you succeed in your learning journey.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="mr-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-4" />
                    <span>support@studysmart.com</span>
                  </div>
                  <div className="flex space-x-4 mt-8">
                    <Twitter className="w-6 h-6 cursor-pointer hover:text-blue-200" />
                    <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-200" />
                    <Linkedin className="w-6 h-6 cursor-pointer hover:text-blue-200" />
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-12">
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                      rows="5"
                      placeholder="Your message..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Study Smart</h3>
              <p className="text-gray-400">
                Revolutionizing education through AI-powered learning tools.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition duration-200">About Us</a></li>
                <li><a href="/features" className="hover:text-white transition duration-200">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition duration-200">Pricing</a></li>
                <li><a href="/blog" className="hover:text-white transition duration-200">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white transition duration-200">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition duration-200">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-white transition duration-200">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Twitter className="w-6 h-6 cursor-pointer hover:text-blue-400 transition duration-200" />
                <Facebook className="w-6 h-6 cursor-pointer hover:text-blue-400 transition duration-200" />
                <Linkedin className="w-6 h-6 cursor-pointer hover:text-blue-400 transition duration-200" />
              </div>
            </div>
          </div>
          <div className="text-center text-gray-400 pt-8 border-t border-gray-800">
            <p>&copy; 2025 Study Smart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;