"use client"

import { useState } from "react"
import AuthGuard from "@/src/components/AuthGuard"
import { ReviewResult } from "@/src/types/resume"

export default function ReviewResume() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("")
  const [roastMode, setRoastMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReviewResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file && !text) {
      alert("Please provide a resume PDF or paste its text.")
      return
    }

    setLoading(true)
    const formData = new FormData()
    if (file) formData.append("resume", file)
    else formData.append("text", text)
    formData.append("roastMode", String(roastMode))

    try {
      const res = await fetch("/api/review-resume", {
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
      console.error("AI Review Analysis Error:", err)
      alert("Review failed. Please try again.")
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
              Elite Resume Review
            </h1>
            <p className="mt-4 text-slate-500 font-medium max-w-2xl mx-auto">
              Get professional HR feedback on your resume. Enable <span className="text-accent font-bold">Gen Z Roast Mode</span> if you dare to see the truth (and some memes).
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Input Form */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Method 1: Upload (PDF)</label>
                  <div className="relative group border-2 border-dashed border-border rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-800/50 transition-colors hover:border-primary/50 text-center">
                    <input 
                      type="file" 
                      accept=".pdf" 
                      onChange={(e) => {
                        setFile(e.target.files?.[0] || null)
                        setText("") // Clear text if file is chosen
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-sm font-medium text-slate-500">
                      {file ? file.name : "Drop Resume PDF"}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
                    <span className="bg-white dark:bg-slate-900 px-4 text-slate-400">OR</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Method 2: Paste Text</label>
                  <textarea 
                    className="w-full h-32 bg-slate-50 dark:bg-slate-800 p-4 border border-border rounded-2xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Paste your resume content here..."
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value)
                      setFile(null) // Clear file if text is chosen
                    }}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border">
                  <div>
                    <p className="text-sm font-bold">Gen Z Roast Mode</p>
                    <p className="text-xs text-slate-500">Funny memes included!</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setRoastMode(!roastMode)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${roastMode ? 'bg-primary' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${roastMode ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-primary py-4 text-lg bg-gradient-to-r from-primary to-secondary"
                >
                  {loading ? "Reviewing..." : "Analyze Resume"}
                </button>
              </form>
            </div>

            {/* Results Display */}
            <div className="space-y-6">
              {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-3xl bg-slate-50/50 dark:bg-slate-900/20 text-center opacity-50">
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Review Results</p>
                  <p className="mt-2 text-slate-400 text-sm">Your SWOT analysis will appear here after analysis.</p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-3xl bg-white dark:bg-slate-900 text-center shadow-lg animate-pulse">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-primary animate-spin mb-6"></div>
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Analyzing...</h3>
                  <p className="mt-2 text-slate-500">AI is looking for gaps in your armor...</p>
                </div>
              )}

              {result && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-border shadow-xl space-y-8 animate-fade-in">
                  {result.roast && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800/20 rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-2 right-2 text-xs font-bold text-red-500 uppercase tracking-widest opacity-30">ROASTED</div>
                      <p className="text-red-700 dark:text-red-400 font-bold italic text-sm">
                        "{result.roast}"
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/20 rounded-2xl">
                      <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Strengths</h4>
                      <ul className="space-y-2">
                        {result.strengths.map((s, i) => (
                          <li key={i} className="text-xs flex gap-2 font-medium text-slate-600 dark:text-slate-400 leading-tight">
                            <span className="text-emerald-500">✓</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/20 rounded-2xl">
                      <h4 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Weaknesses</h4>
                      <ul className="space-y-2">
                        {result.weaknesses.map((w, i) => (
                          <li key={i} className="text-xs flex gap-2 font-medium text-slate-600 dark:text-slate-400 leading-tight">
                            <span className="text-amber-500">!</span> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <section>
                    <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">AI Suggestions</h4>
                    <ul className="space-y-3">
                      {result.suggestions.map((s, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-primary text-[10px] flex-shrink-0">{i+1}</div>
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