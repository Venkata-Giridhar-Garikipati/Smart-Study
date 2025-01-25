import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

const VALID_TYPES = ['flashcards', 'flashcard', 'quiz', 'qa'];
const PROMPT_TEMPLATE = (chapters, type) => {
    if (['flashcards', 'flashcard'].includes(type)) {
        return `Generate the flashcard on topic: ${chapters}, Basic App Navigation in JSON format with front and back content, Maximum 15`;
    } else if (type === 'quiz') {
        return `Generate the Quiz on topic: ${chapters}, Basic App Navigation with questions, options, and correct answers in JSON format, Maximum 10 or 15`;
    } else if (type === 'qa') {
        return `Generate the Question/Answer pairs on topic: ${chapters}, Basic App Navigation in JSON format with a question and its corresponding answer, Maximum 15`;
    }
    return "";
};

const validateInput = async (chapters, courseId, type) => {
    if (!chapters || !courseId || !type) {
        return { success: false, error: "Missing required fields", status: 400 };
    }

    const standardizedType = type.toLowerCase();
    if (!VALID_TYPES.includes(standardizedType)) {
        return { success: false, error: "Invalid type provided", status: 400 };
    }

    if (!chapters.trim()) {
        return { success: false, error: "Chapters cannot be empty", status: 400 };
    }

    return { success: true };
};

export async function POST(req) {
    console.log("POST request started");
    try {
        const { chapters, courseId, type } = await req.json();
        console.log("API POST request data:", { chapters, courseId, type });

        const validationResult = await validateInput(chapters, courseId, type);
        if (!validationResult.success) {
            console.log("Validation Failed:", validationResult);
            return NextResponse.json({ success: false, error: validationResult.error }, { status: validationResult.status });
        }

        const standardizedType = type.toLowerCase();
        console.log("Standardized Type:", standardizedType);
        const PROMPT = PROMPT_TEMPLATE(chapters, standardizedType);

        const result = await db.insert(STUDY_TYPE_CONTENT_TABLE)
            .values({
                courseId: courseId,
                type: type,
            })
            .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });
        console.log("DB insert result:", result);

        if (!result || result.length === 0) {
            console.log("Database Insert Failed: No Record Created");
            return NextResponse.json({ success: false, error: "Database Insert Failed: No Record Created" }, { status: 500 });
        }

        await inngest.send({
            name: 'studyType.content',
            data: {
                studyType: type,
                prompt: PROMPT,
                courseId: courseId,
                recordId: result[0].id,
            },
        });
        console.log("Inngest event sent successfully");

        return NextResponse.json({ success: true, data: { recordId: result[0].id } });
    } catch (error) {
        const { message, stack } = error;
        console.error("Error Handling POST Request:", message, stack);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
