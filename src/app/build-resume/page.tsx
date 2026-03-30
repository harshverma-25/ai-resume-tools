"use client"

import { useState } from "react"
import AuthGuard from "@/src/components/AuthGuard"
import ResumeForm from "@/src/components/ResumeForm"
import ResumePreview from "@/src/components/ResumePreview"
import { ResumeData } from "@/src/types/resume"

export default function BuildResume() {
  const [resume, setResume] = useState<ResumeData | null>(null)

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <header className="mb-10 text-center sm:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Elite Resume Builder
            </h1>
            <p className="mt-2 text-slate-500 font-medium">
              Fill in your details and let our AI transform them into a professional, ATS-optimized masterpiece.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Input Form */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-sm w-fit mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Editor Mode</span>
              </div>
              <ResumeForm setResume={setResume} />
            </div>

            {/* Right: Live Preview */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-sm w-fit">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Master Preview</span>
                </div>
                
                {resume && (
                  <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1 group cursor-help">
                      <svg className="w-4 h-4 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ATS Friendly Checked
                    </span>
                  </div>
                )}
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <ResumePreview resume={resume} />
              </div>

              {!resume && (
                <div className="bg-white/50 dark:bg-slate-900/50 rounded-3xl p-6 border border-border/50 text-center">
                  <p className="text-sm text-slate-500 italic">
                    "The best way to predict your future is to create it." 
                    <span className="block mt-1 font-bold not-italic text-slate-400">— AI Assistant</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}