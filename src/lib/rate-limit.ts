import { supabase } from "./supabase"

export async function checkResumeLimit(userId: string) {

  const today = new Date()
  today.setHours(0,0,0,0)

  const { data, error } = await supabase
    .from("usage_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("feature", "resume_builder")
    .gte("created_at", today.toISOString())

  if (error) throw error

  if (data.length >= 5) {
    return false
  }

  return true
}

export async function logResumeUsage(userId: string) {

    await supabase
      .from("usage_logs")
      .insert({
        user_id: userId,
        feature: "resume_builder"
      })
  
  }