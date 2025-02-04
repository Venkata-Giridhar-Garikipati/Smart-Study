import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, studyType } = await req.json();

  if (!courseId || !studyType) {
    return NextResponse.json({ error: "Missing courseId or studyType" }, { status: 400 });
  }

  try {
    const standardizedStudyType = studyType.toLowerCase();

    if (studyType === "ALL") {
      // Fetch notes
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      // Fetch all study type content related to courseId
      const contentList = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

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
          .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));
      } else if (standardizedStudyType === "flashcards" || standardizedStudyType === "flashcard") {
        result = await db
          .select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(
            and(
              eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
              eq(STUDY_TYPE_CONTENT_TABLE.type, "flashcards")
            )
          );
      } else if (standardizedStudyType === "quiz") {
        result = await db
          .select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(
            and(
              eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
              eq(STUDY_TYPE_CONTENT_TABLE.type, "quiz")
            )
          );
      } else if (standardizedStudyType === "qa") {
        result = await db
          .select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(
            and(
              eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
              eq(STUDY_TYPE_CONTENT_TABLE.type, "qa")
            )
          );
      }

      if (!result || result.length === 0) {
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
