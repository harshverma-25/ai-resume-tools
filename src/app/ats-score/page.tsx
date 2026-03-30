"use client"

import { useState } from "react"
import AuthGuard from "@/src/components/AuthGuard"
import { ATSResult } from "@/src/types/resume"

export default function AtsScore() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDesc, setJobDesc] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ATSResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !jobDesc) {
      alert("Please provide both a resume and a job description.")
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append("resume", file)
    formData.append("jobDesc", jobDesc)

    try {
      const res = await fetch("/api/ats-score", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (data.error) {
        alert(data.error)
        return
      }
      setResult(data)
    } catch (err) {
      console.error("ATS Score Analysis Error:", err)
      alert("Analysis failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              ATS Optimizer
            </h1>
            <p className="mt-4 text-slate-500 font-medium max-w-2xl mx-auto">
              Wondering why your resume isn't getting interviews? Get an instant ATS compatibility score and expert suggestions to bypass screeners.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Upload Resume (PDF)</label>
                  <div className="relative group border-2 border-dashed border-border rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-800/50 transition-colors hover:border-primary/50">
                    <input 
                      type="file" 
                      accept=".pdf" 
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center">
                      <svg className="w-10 h-10 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm font-medium text-slate-500">
                        {file ? file.name : "Choose a PDF or drag it here"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Paste Job Description</label>
                  <textarea 
                    className="w-full h-48 bg-slate-50 dark:bg-slate-800 p-4 border border-border rounded-2xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Paste the target job description here..."
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-primary py-4 text-lg bg-gradient-to-r from-primary to-secondary"
                >
                  {loading ? "Analyzing... Please wait" : "Check ATS Compatibility"}
                </button>
              </form>
            </div>

            {/* Results Display */}
            <div className="space-y-6">
              {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-3xl bg-slate-50/50 dark:bg-slate-900/20 text-center opacity-50">
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Analysis Result</p>
                  <p className="mt-2 text-slate-400 text-sm">Upload your resume and the job listing to see the magic happen.</p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-3xl bg-white dark:bg-slate-900 text-center shadow-lg animate-pulse">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-primary animate-spin mb-6"></div>
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Analyzing...</h3>
                  <p className="mt-2 text-slate-500">AI is cross-referencing keywords and structure...</p>
                </div>
              )}

              {result && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-border shadow-xl space-y-8 animate-fade-in">
                  <div className="text-center relative">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-slate-50 dark:border-slate-800 shadow-inner relative overflow-hidden">
                       <span className={`text-3xl font-extrabold ${result.score > 70 ? 'text-emerald-500' : result.score > 40 ? 'text-amber-500' : 'text-red-500'}`}>
                        {result.score}%
                       </span>
                    </div>
                    <div className="mt-4">
                       <h3 className="text-xl font-bold">ATS Score</h3>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compatibility Rating</p>
                    </div>
                  </div>

                  {result.missingKeywords.length > 0 && (
                    <section>
                      <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.missingKeywords.map((kw, i) => (
                          <span key={i} className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/30 rounded-lg text-xs font-bold">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  <section>
                    <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Actionable Advice</h4>
                    <ul className="space-y-3">
                      {result.suggestions.map((s, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}