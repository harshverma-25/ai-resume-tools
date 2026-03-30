"use client"

import { useState } from "react"
import { supabase } from "@/src/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      alert(error.message)
    } else {
      if (isSignUp) {
        alert("Signup successful! Check your email for verification.")
      } else {
        router.push("/dashboard")
      }
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard"
      }
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          Start building your elite career today.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-10 px-6 shadow-2xl rounded-3xl border border-border">
          <form className="space-y-6" onSubmit={handleAuth}>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Email address</label>
              <input
                type="email"
                required
                className="mt-2 block w-full bg-slate-50 dark:bg-slate-800 border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password"
                required
                className="mt-2 block w-full bg-slate-50 dark:bg-slate-800 border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-bold bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20"
            >
              {loading ? "Processing..." : (isSignUp ? "Join Now" : "Sign In")}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
              <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest"><span className="bg-white dark:bg-slate-900 px-4 text-slate-400">Continue with</span></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-bold"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.94 0 3.68.67 5.05 1.97l3.77-3.77C18.54 1.24 15.46 0 12 0 7.31 0 3.25 2.69 1.25 6.64l4.33 3.35c1.02-3.05 3.86-5.29 6.42-5.29z"/>
                <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.89 3.02c2.27-2.09 3.53-5.17 3.53-8.84z"/>
                <path fill="#FBBC05" d="M5.58 14.71c-.24-.72-.37-1.48-.37-2.71s.13-1.99.37-2.71L1.25 6.64C.45 8.24 0 10.06 0 12c0 1.94.45 3.76 1.25 5.36l4.33-3.35z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.89-3.02c-1.1.74-2.51 1.18-4.04 1.18-3.13 0-5.78-2.11-6.73-4.94L1.01 17.65C2.88 21.43 6.8 24 12 24z"/>
              </svg>
              Sign in with Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary font-black hover:underline underline-offset-4"
            >
              {isSignUp ? "Sign In" : "Sign up for Elite access"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}