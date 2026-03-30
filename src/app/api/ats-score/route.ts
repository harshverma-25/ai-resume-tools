import { model } from "@/src/lib/gemini"
import { supabase } from "@/src/lib/supabase"
// @ts-ignore
import pdfParse from "pdf-parse"

export async function POST(req: Request) {
  try {
    // 1. Auth check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("resume") as File
    const jobDesc = formData.get("jobDesc") as string

    if (!file || !jobDesc) {
      return Response.json({ error: "Missing file or job description" }, { status: 400 })
    }

    // 2. Parse PDF
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    let resumeText = ""
    try {
      const pdf = await pdfParse(buffer)
      resumeText = pdf.text
    } catch (parseErr) {
      console.error("PDF Parse Error:", parseErr)
      return Response.json({ error: "Failed to read PDF file. Please ensure it is a valid PDF." }, { status: 422 })
    }

    // 3. AI Analysis
    const prompt = `
      You are an expert ATS (Applicant Tracking System) optimizer.
      Analyze the provided resume text against the job description and provide a calculated ATS score.

      RESUME TEXT:
      ${resumeText}

      JOB DESCRIPTION:
      ${jobDesc}

      Instructions:
      1. Calculate an ATS compatibility score from 0-100%.
      2. Identify missing keywords (technical and soft skills).
      3. Provide specific, actionable suggestions to improve the score.
      
      Return ONLY a JSON object:
      {
        "score": number,
        "missingKeywords": ["keyword1", "keyword2"],
        "suggestions": ["Suggestion 1", "Suggestion 2"]
      }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text().replace(/```json/g, "").replace(/```/g, "").trim()

    // 4. Update usage log (different feature tag)
    await supabase.from("usage_logs").insert({
      user_id: user.id,
      feature: "ats_checker"
    })

    return Response.json(JSON.parse(text))
  } catch (err: any) {
    console.error("ATS Score API Error:", err)
    return Response.json({ error: "Failed to analyze resume. Please try again." }, { status: 500 })
  }
}