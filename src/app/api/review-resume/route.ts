import { model } from "@/src/lib/gemini"
import { supabase } from "@/src/lib/supabase"
// @ts-ignore
import pdfParse from "pdf-parse"

export async function POST(req: Request) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("resume") as File | null
    const text = formData.get("text") as string | null
    const roastMode = formData.get("roastMode") === "true"

    let resumeText = ""
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const pdf = await pdfParse(buffer)
      resumeText = pdf.text
    } else if (text) {
      resumeText = text
    }

    if (!resumeText) {
      return Response.json({ error: "No resume content provided" }, { status: 400 })
    }

    const prompt = `
      You are a professional resume reviewer with two personalities:
      1. A serious, expert HR professional who provides detailed SWOT analysis.
      2. A funny, "Gen Z" style roasted who memes on weak resumes.

      REVIEW DATA:
      ${resumeText}

      INSTRUCTIONS:
      - Provide 3-5 specific strengths.
      - Provide 3-5 specific weaknesses.
      - Provide 3-5 actionable suggestions.
      
      ${roastMode ? `
        GEN Z ROAST MODE IS ON:
        - If the resume is weak (vague descriptions, poor formatting, few skills), ROAST IT using Gen Z slang and Indian meme culture references.
        - References to use: "Kya developer banega tu?", "Hera Pheri", "Ashneer Grover" (Bhai kya kar raha hai tu?), "Ye toh tatti hai bhai".
        - The roast should be funny but ultimately point to the biggest weakness.
      ` : ""}

      Return ONLY a JSON object:
      {
        "strengths": ["string"],
        "weaknesses": ["string"],
        "suggestions": ["string"],
        "roast": "optional_humorous_roast_string"
      }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    let aiText = response.text().replace(/```json/g, "").replace(/```/g, "").trim()

    // Log usage
    await supabase.from("usage_logs").insert({
      user_id: user.id,
      feature: "resume_review"
    })

    return Response.json(JSON.parse(aiText))
  } catch (err: any) {
    console.error("Resume Review API Error:", err)
    return Response.json({ error: "Failed to review resume. Please try again." }, { status: 500 })
  }
}