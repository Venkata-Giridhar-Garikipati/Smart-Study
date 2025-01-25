import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { courseId, topic, studyType, difficultyLevel, createdBy } = await req.json();

    // Validate required fields
    if (!courseId || !topic || !difficultyLevel || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields in the request body." },
        { status: 400 }
      );
    }

    // Debug log the input data
    console.log("Request Data:", { courseId, topic, studyType, difficultyLevel, createdBy });

    // Provide default value for courseType if missing
    const validCourseType = studyType || "General"; // Default value

    const PROMPT = `
     Generate a study material for ${topic} for ${validCourseType} and level of difficulty ${difficultyLevel}.with equivalent emoji and summary
       The output must be a valid JSON object with the following format:
{
       "courseTitle":"course Title",
      "courseSummary": "Course summary",
  "chapters": [
    {
      "chapterEmoji": "equivalent emoji",
      "chapterTitle": "Title of Chapter 1",
      "chapterSummary": "Summary of Chapter 1",
      "topics": ["Topic 1", "Topic 2","Topic 3", "Topic 4","Topic 5", "Topic 6"]
    }
  ]
}
Do not include any additional text, explanations, or comments.
`;

    // Generate course layout using AI
    const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
    let responseText = await aiResp.response.text();

    // Handle markdown-like wrapping in AI response
    if (responseText.trim().startsWith("```json")) {
      responseText = responseText.replace(/```json|```/g, " ").trim();
    }

    console.log("Cleaned AI Response:", responseText);

    // Parse the cleaned AI response
    const aiResult = JSON.parse(responseText);

    // Save the user result to the database
    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId: courseId,
        courseType: validCourseType,
        createdBy: createdBy,
        topic: topic,
        difficultyLevel: difficultyLevel,
        courseLayout: JSON.stringify(aiResult), // Save as stringified JSON
      })
      .returning();

   

    //Trigger the inngest function to generate notes

    const result = await inngest.send({
      name:'notes.generate',
      data:{
        course:dbResult[0]
      }
    });
    console.log(result);

    // Return the first result
    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing the request.", details: error.message },
      { status: 500 }
    );
  }
}
