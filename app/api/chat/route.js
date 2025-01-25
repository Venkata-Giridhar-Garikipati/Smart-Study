// app/api/chat/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ reply: "Please provide a message!" }, { status: 400 });
        }

        const result = await model.generateContent(message);
        const response = await result.response.text();

        return NextResponse.json({ reply: response });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { reply: "Sorry, I encountered an error. Please try again later." },
            { status: 500 }
        );
    }
}