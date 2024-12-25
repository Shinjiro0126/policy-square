import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
  const apiKey:string | undefined = process.env.GEMINI_API_KEY;

  if(!apiKey){
    return NextResponse.json({ error: "API key is missing" }, {status: 500});
  }
  
  const genAI = new GoogleGenerativeAI(apiKey as string);

  try {
    const body = await req.json();
    const {prompt} = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid or missing prompt" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({text}, {status: 200});
  } catch (error) {
    console.log("Error generating content:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}