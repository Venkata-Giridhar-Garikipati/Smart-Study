"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function QAViewer() {
  const [qaData, setQAData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    GetQA();
  }, []);

  const GetQA = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "qa",
      });
      console.log(result?.data);
      console.log(result?.data?.[0]?.content);
      setQAData(result?.data?.[0]?.content);
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      setError("Failed to load QA data."); // Set error if API call fails
      setLoading(false); // Also set loading to false in case of error
      console.error("Error fetching QA data:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg flex items-center justify-center">
        <p className="text-gray-600 animate-pulse">Loading QA data...</p>
      </div>
    );
  }

  if(error){
    return (
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b-2 pb-4 border-gray-200">
        Questions & Answers
      </h1>
      {qaData.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-600 text-lg">
            No QA content available for this course.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {qaData.map((qa, index) => (
            <li key={index} className="py-6">
              <div className="mb-3">
                <span className="text-sm font-semibold text-gray-500">
                  Question {index + 1}:
                </span>
                <p className="mt-2 text-xl text-gray-900 font-semibold leading-relaxed">
                  {qa.question}
                </p>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-500">
                  Answer:
                </span>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {qa.answer}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}