import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq, like,or } from "drizzle-orm";
import { NextResponse } from "next/server";
import validator from 'validator';


export async function POST(req) {
  const { courseId, studyType } = await req.json();

  if (!courseId || !studyType) {
    return NextResponse.json({ error: "Missing courseId or studyType" }, { status: 400 });
  }
  // Sanitize the courseId and studyType
  const sanitizedCourseId = validator.escape(courseId);
    const sanitizedStudyType = validator.escape(studyType);

  try {
     const standardizedStudyType = sanitizedStudyType.toLowerCase();

    if (sanitizedStudyType === "ALL") {
      // Fetch notes
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, sanitizedCourseId));

      // Fetch all study type content related to courseId
      const contentList = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, sanitizedCourseId));

      // Structure the result based on type, standardized to lowercase
      const result = {
        notes,
        flashcards: contentList?.filter(
          (item) => (item.type || "").toLowerCase() === "flashcards" || (item.type || "").toLowerCase() === "flashcard"
        ),
        quiz: contentList?.filter((item) => (item.type || "").toLowerCase() === "quiz"),
         qa: contentList?.filter((item) => (item.type || "").toLowerCase() === "qa"),
      };

      return NextResponse.json(result, { status: 200 });
    } else if (
      ["notes", "flashcard", "flashcards", "quiz", "qa"].includes(standardizedStudyType)
    ) {
      let result;

      if (standardizedStudyType === "notes") {
        result = await db
          .select()
          .from(CHAPTER_NOTES_TABLE)
          .where(eq(CHAPTER_NOTES_TABLE.courseId, sanitizedCourseId));
      } else if (standardizedStudyType === "flashcards" || standardizedStudyType === "flashcard") {
        result = await db
          .select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(
            and(
              eq(STUDY_TYPE_CONTENT_TABLE.courseId, sanitizedCourseId),
              or(
               eq(STUDY_TYPE_CONTENT_TABLE.type, "flashcards"),
              eq(STUDY_TYPE_CONTENT_TABLE.type,'flashcard'))
            )
          );
      } else if (standardizedStudyType === "quiz") {
        result = await db
          .select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(
            and(
              eq(STUDY_TYPE_CONTENT_TABLE.courseId, sanitizedCourseId),
              eq(STUDY_TYPE_CONTENT_TABLE.type, "quiz")
            )
          );
      } else if (standardizedStudyType === "qa") {
        result = await db
          .select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(
            and(
              eq(STUDY_TYPE_CONTENT_TABLE.courseId, sanitizedCourseId),
              eq(STUDY_TYPE_CONTENT_TABLE.type, "qa")
            )
          );
      }


      if (!result || result.length === 0) {
          console.log("no data found")
        return NextResponse.json(
          { error: `No data found for studyType: ${studyType}` },
          { status: 404 }
        );
      }

      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid studyType" }, { status: 400 });
    }
  } catch (error) {
      console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}