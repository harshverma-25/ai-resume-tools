"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabase"
import AuthGuard from "@/src/components/AuthGuard"
import Link from "next/link"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [usage, setUsage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const { data } = await supabase
          .from("usage_logs")
          .select("*")
          .eq("user_id", user.id)
          .eq("feature", "resume_builder")
          .gte("created_at", today.toISOString())

        setUsage(data?.length || 0)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-slate-100 border-t-primary animate-spin rounded-full"></div>
    </div>
  )

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Your Dashboard</h1>
            <p className="text-slate-500 font-medium">Welcome back, {user?.email}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stats Card */}
            <div className="card col-span-1 md:col-span-2 overflow-hidden relative group">
              <div className="absolute top-0 right-0 -m-4 w-40 h-40 bg-primary/5 rounded-full blur-3xl transition-transform group-hover:scale-125"></div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Resource Usage
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Daily Resumes</p>
                    <span className="text-2xl font-black text-primary">{usage} <span className="text-slate-300 text-lg">/ 5</span></span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out" 
                      style={{ width: `${(usage / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-400 italic">Usage resets at midnight local time.</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quick Start</h3>
              <div className="grid grid-cols-1 gap-4">
                <Link href="/build-resume" className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-border hover:border-primary transition-all group">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Create New Resume</p>
                    <p className="text-xs text-slate-500">AI Rewriting active</p>
                  </div>
                </Link>
                <Link href="/ats-score" className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-border hover:border-secondary transition-all group">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Check ATS Score</p>
                    <p className="text-xs text-slate-500">Benchmark your skills</p>
                  </div>
                </Link>
                <Link href="/review-resume" className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-border hover:border-accent transition-all group">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Review Resume</p>
                    <p className="text-xs text-slate-500">SWOT + Roast Mode</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
