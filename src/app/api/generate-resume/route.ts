import { model } from "@/src/lib/gemini"
import { supabase } from "@/src/lib/supabase"
import { ResumeData } from "@/src/types/resume"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { personalInfo, education, skills, projects, experience, template } = body

    // 1. Get logged in user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Check today's usage (Rate limit: 5 resumes/day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data: usage, error: usageError } = await supabase
      .from("usage_logs")
      .select("*")
      .eq("user_id", user.id)
      .eq("feature", "resume_builder")
      .gte("created_at", today.toISOString())

    if (usage && usage.length >= 5) {
      return Response.json({
        error: "Daily limit reached (5 resumes per day). Try again tomorrow!"
      }, { status: 429 })
    }

    // 3. Construct the prompt for high-quality student resume
    const prompt = `
      You are an expert resume writer specializing in ATS-friendly resumes for students.
      Your goal is to take raw, often weak, student resume data and rewrite it into a highly professional, achievement-oriented format.

      CRITICAL RULES:
      - Rewrite weak descriptions (e.g., "I made a website") into strong, action-oriented achievements (e.g., "Architected a responsive React application resulting in a 20% increase in user engagement").
      - Use strong action verbs like: Developed, Spearheaded, Optimized, Engineered, Collaborated, Implemented.
      - If 'experience' is empty, ensure 'projects' are exceptionally well-detailed.
      - Ensure 'skills' are properly categorized (e.g., Languages, Frameworks, Tools).
      - Maintain a professional, objective tone.
      - The resume must be ATS-friendly (no complex symbols, clean structure).
      
      Return ONLY a valid JSON object matching this structure:
      {
        "personalInfo": { "fullName": "", "email": "", "phone": "", "location": "", "linkedin": "", "github": "" },
        "education": [{ "school": "", "degree": "", "startDate": "", "endDate": "", "description": "" }],
        "skills": [{ "category": "", "items": [""] }],
        "projects": [{ "title": "", "technologies": "", "description": "", "link": "" }],
        "experience": [{ "company": "", "role": "", "startDate": "", "endDate": "", "description": "" }],
        "template": "${template || 'classic'}"
      }

      RAW USER DATA:
      Personal Info: ${JSON.stringify(personalInfo)}
      Education: ${JSON.stringify(education)}
      Skills: ${JSON.stringify(skills)}
      Projects: ${JSON.stringify(projects)}
      Experience: ${JSON.stringify(experience)}
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()
    
    // Clean up potential markdown formatting in AI response
    text = text.replace(/```json/g, "").replace(/```/g, "").trim()

    // 4. Log usage
    await supabase.from("usage_logs").insert({
      user_id: user.id,
      feature: "resume_builder"
    })

    return Response.json({ data: text })
  } catch (err: any) {
    console.error("Generate Resume Error:", err)
    return Response.json({ error: "Failed to generate resume. Please check your data or try again later." }, { status: 500 })
  }
}